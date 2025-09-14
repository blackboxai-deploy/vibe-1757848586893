import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database/connection';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Build query based on user role
    let query = `
      SELECT 
        d.DrugID as id,
        d.DrugName as drugName,
        d.GenericName as genericName,
        pc.CategoryName as category,
        s.SupplierName as supplier,
        sl.CurrentStock as quantity,
        sl.MinThreshold as reorderLevel,
        d.UnitPrice as unitPrice,
        DATE(sl.CreatedAt) as lastUpdated,
        sl.StockStatus as stockStatus,
        sl.ExpiryDate as expiryDate,
        d.RFIDTag as rfidTag
      FROM DimPharmaceutical d
      LEFT JOIN DimPharmaceuticalCategory pc ON d.CategoryID = pc.CategoryID
      LEFT JOIN FactStockLevels sl ON d.DrugID = sl.DrugID
      LEFT JOIN DimSupplierDrugLink sdl ON d.DrugID = sdl.DrugID
      LEFT JOIN DimSupplier s ON sdl.SupplierID = s.SupplierID
      WHERE d.IsActive = TRUE
    `;

    const params: any[] = [];

    // Role-based filtering
    if (user.role === 'Clinic' && user.organizationId) {
      query += ' AND sl.ClinicID = ?';
      params.push(user.organizationId);
    } else if (user.role === 'Supplier' && user.organizationId) {
      query += ' AND s.SupplierID = ?';
      params.push(user.organizationId);
    }

    query += ' ORDER BY d.DrugName ASC';

    const inventory = await executeQuery(query, params);

    return NextResponse.json({
      success: true,
      data: inventory
    });

  } catch (error) {
    console.error('Inventory fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const {
      drugName,
      genericName,
      categoryId,
      unitPrice,
      boxPrice,
      expirationPeriodMonths,
      unitType,
      rfidTag,
      quantity,
      minThreshold,
      supplierId
    } = await request.json();

    // Validate required fields
    if (!drugName || !categoryId || !unitPrice) {
      return NextResponse.json(
        { message: 'Drug name, category, and unit price are required' },
        { status: 400 }
      );
    }

    // Insert pharmaceutical
    const pharmaceuticalResult = await executeQuery(`
      INSERT INTO DimPharmaceutical 
      (DrugName, GenericName, CategoryID, UnitPrice, BoxPrice, ExpirationPeriodMonths, UnitType, RFIDTag, CreatedAt, UpdatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [drugName, genericName, categoryId, unitPrice, boxPrice, expirationPeriodMonths, unitType, rfidTag]);

    const drugId = (pharmaceuticalResult as any).insertId;

    // Create stock level entry
    const dateId = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
    
    await executeQuery(`
      INSERT INTO FactStockLevels 
      (DrugID, ClinicID, DateID, CurrentStock, MinThreshold, StockStatus, CreatedAt)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
      drugId,
      user.organizationId || 1,
      dateId,
      quantity || 0,
      minThreshold || 0,
      quantity && minThreshold ? (quantity <= minThreshold ? 'Low' : 'Normal') : 'Normal'
    ]);

    // Link to supplier if provided
    if (supplierId) {
      await executeQuery(`
        INSERT INTO DimSupplierDrugLink (SupplierID, DrugID, CreatedAt)
        VALUES (?, ?, NOW())
      `, [supplierId, drugId]);
    }

    // Log the action
    await executeQuery(`
      INSERT INTO AuditLog (UserID, Action, TableName, RecordID, NewValues, CreatedAt)
      VALUES (?, ?, ?, ?, ?, NOW())
    `, [
      user.userId,
      'CREATE_INVENTORY_ITEM',
      'DimPharmaceutical',
      drugId,
      JSON.stringify({ drugName, genericName, quantity, unitPrice })
    ]);

    return NextResponse.json({
      success: true,
      message: 'Inventory item created successfully',
      data: { id: drugId }
    });

  } catch (error) {
    console.error('Inventory creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create inventory item' },
      { status: 500 }
    );
  }
}