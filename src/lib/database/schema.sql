-- Regnum Pecunia Healthcare Supply Chain Management Database Schema
-- Complete implementation of the data warehouse schema

-- Drop existing tables if they exist (for development)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS FactFinancials;
DROP TABLE IF EXISTS FactStockLevels;
DROP TABLE IF EXISTS FactPurchases;
DROP TABLE IF EXISTS FactSales;
DROP TABLE IF EXISTS FactInventoryTransactions;
DROP TABLE IF EXISTS DimSupplierDrugLink;
DROP TABLE IF EXISTS DimEmployee;
DROP TABLE IF EXISTS DimPharmaceutical;
DROP TABLE IF EXISTS DimPharmaceuticalCategory;
DROP TABLE IF EXISTS DimSupplier;
DROP TABLE IF EXISTS DimClinic;
DROP TABLE IF EXISTS DimLocation;
DROP TABLE IF EXISTS DimDate;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserSessions;
SET FOREIGN_KEY_CHECKS = 1;

-- User Management Tables
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255),
    Name VARCHAR(255) NOT NULL,
    Role ENUM('Admin', 'Supplier', 'Pharmacist', 'Clinic', 'Health_Staff') NOT NULL,
    OrganizationID INT,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    LastLogin TIMESTAMP NULL,
    GoogleID VARCHAR(255) NULL,
    PasskeyCredentials JSON NULL
);

CREATE TABLE UserSessions (
    SessionID VARCHAR(255) PRIMARY KEY,
    UserID INT,
    ExpiresAt TIMESTAMP,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Dimension Tables

-- DimLocation
CREATE TABLE DimLocation (
    LocationID INT PRIMARY KEY AUTO_INCREMENT,
    Country VARCHAR(100),
    Region VARCHAR(100),
    City VARCHAR(100),
    PostalCode VARCHAR(20),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DimClinic
CREATE TABLE DimClinic (
    ClinicID INT PRIMARY KEY AUTO_INCREMENT,
    ClinicName VARCHAR(255) NOT NULL,
    ClinicType ENUM('Public', 'Private') NOT NULL,
    ClinicManager VARCHAR(255),
    ContactEmail VARCHAR(255),
    ContactNumber VARCHAR(20),
    LocationID INT,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (LocationID) REFERENCES DimLocation(LocationID)
);

-- DimSupplier
CREATE TABLE DimSupplier (
    SupplierID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierName VARCHAR(255) NOT NULL,
    SupplierType ENUM('Distributor', 'Manufacturer') NOT NULL,
    LocationID INT,
    ContactPerson VARCHAR(255),
    ContactEmail VARCHAR(255),
    ContactNumber VARCHAR(20),
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (LocationID) REFERENCES DimLocation(LocationID)
);

-- DimPharmaceuticalCategory
CREATE TABLE DimPharmaceuticalCategory (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL,
    Description TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DimPharmaceutical
CREATE TABLE DimPharmaceutical (
    DrugID INT PRIMARY KEY AUTO_INCREMENT,
    DrugName VARCHAR(255) NOT NULL,
    GenericName VARCHAR(255),
    CategoryID INT,
    UnitPrice DECIMAL(10, 2),
    BoxPrice DECIMAL(10, 2),
    ExpirationPeriodMonths INT,
    UnitType VARCHAR(50),
    RFIDTag VARCHAR(100) UNIQUE,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CategoryID) REFERENCES DimPharmaceuticalCategory(CategoryID)
);

-- DimEmployee
CREATE TABLE DimEmployee (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    Role VARCHAR(100),
    ClinicID INT,
    UserID INT,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ClinicID) REFERENCES DimClinic(ClinicID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- DimDate
CREATE TABLE DimDate (
    DateID INT PRIMARY KEY,
    FullDate DATE NOT NULL,
    Day INT,
    Month INT,
    Quarter INT,
    Year INT,
    WeekOfYear INT,
    DayOfWeek INT,
    IsWeekend BOOLEAN DEFAULT FALSE,
    MonthName VARCHAR(20),
    QuarterName VARCHAR(10)
);

-- DimSupplierDrugLink
CREATE TABLE DimSupplierDrugLink (
    SupplierDrugID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierID INT,
    DrugID INT,
    SupplierPrice DECIMAL(10, 2),
    IsPreferred BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SupplierID) REFERENCES DimSupplier(SupplierID),
    FOREIGN KEY (DrugID) REFERENCES DimPharmaceutical(DrugID)
);

-- Fact Tables

-- FactInventoryTransactions
CREATE TABLE FactInventoryTransactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    DrugID INT,
    SupplierID INT,
    ClinicID INT,
    Quantity INT,
    TransactionDateID INT,
    TransactionType ENUM('In', 'Out', 'Return', 'Transfer') NOT NULL,
    ReferenceNumber VARCHAR(100),
    Notes TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (DrugID) REFERENCES DimPharmaceutical(DrugID),
    FOREIGN KEY (SupplierID) REFERENCES DimSupplier(SupplierID),
    FOREIGN KEY (ClinicID) REFERENCES DimClinic(ClinicID),
    FOREIGN KEY (TransactionDateID) REFERENCES DimDate(DateID)
);

-- FactSales
CREATE TABLE FactSales (
    SaleID INT PRIMARY KEY AUTO_INCREMENT,
    ClinicID INT,
    DrugID INT,
    DateID INT,
    QuantitySold INT,
    SaleAmount DECIMAL(10,2),
    EmployeeID INT,
    CustomerType ENUM('Patient', 'Insurance', 'Government') DEFAULT 'Patient',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ClinicID) REFERENCES DimClinic(ClinicID),
    FOREIGN KEY (DrugID) REFERENCES DimPharmaceutical(DrugID),
    FOREIGN KEY (DateID) REFERENCES DimDate(DateID),
    FOREIGN KEY (EmployeeID) REFERENCES DimEmployee(EmployeeID)
);

-- FactPurchases
CREATE TABLE FactPurchases (
    PurchaseID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierID INT,
    DrugID INT,
    ClinicID INT,
    DateID INT,
    QuantityPurchased INT,
    PurchaseAmount DECIMAL(10,2),
    OrderStatus ENUM('Pending', 'Confirmed', 'Shipped', 'Delivered') DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SupplierID) REFERENCES DimSupplier(SupplierID),
    FOREIGN KEY (DrugID) REFERENCES DimPharmaceutical(DrugID),
    FOREIGN KEY (ClinicID) REFERENCES DimClinic(ClinicID),
    FOREIGN KEY (DateID) REFERENCES DimDate(DateID)
);

-- FactFinancials
CREATE TABLE FactFinancials (
    FinancialID INT PRIMARY KEY AUTO_INCREMENT,
    ClinicID INT,
    DateID INT,
    TotalRevenue DECIMAL(12,2),
    TotalExpenses DECIMAL(12,2),
    NetProfit DECIMAL(12,2) AS (TotalRevenue - TotalExpenses) STORED,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ClinicID) REFERENCES DimClinic(ClinicID),
    FOREIGN KEY (DateID) REFERENCES DimDate(DateID)
);

-- FactStockLevels
CREATE TABLE FactStockLevels (
    StockID INT PRIMARY KEY AUTO_INCREMENT,
    DrugID INT,
    ClinicID INT,
    DateID INT,
    CurrentStock INT,
    MinThreshold INT,
    MaxCapacity INT,
    ExpiryDate DATE,
    StockStatus ENUM('Normal', 'Low', 'Critical', 'Expired') DEFAULT 'Normal',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (DrugID) REFERENCES DimPharmaceutical(DrugID),
    FOREIGN KEY (ClinicID) REFERENCES DimClinic(ClinicID),
    FOREIGN KEY (DateID) REFERENCES DimDate(DateID)
);

-- Audit Log Table
CREATE TABLE AuditLog (
    AuditID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Action VARCHAR(100) NOT NULL,
    TableName VARCHAR(100),
    RecordID INT,
    OldValues JSON,
    NewValues JSON,
    IPAddress VARCHAR(45),
    UserAgent TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Indexes for Performance
CREATE INDEX idx_users_email ON Users(Email);
CREATE INDEX idx_users_role ON Users(Role);
CREATE INDEX idx_inventory_date ON FactInventoryTransactions(TransactionDateID);
CREATE INDEX idx_sales_date ON FactSales(DateID);
CREATE INDEX idx_purchases_date ON FactPurchases(DateID);
CREATE INDEX idx_stock_levels_date ON FactStockLevels(DateID);
CREATE INDEX idx_pharmaceutical_rfid ON DimPharmaceutical(RFIDTag);
CREATE INDEX idx_audit_user_date ON AuditLog(UserID, CreatedAt);

-- Insert sample date dimension data
INSERT INTO DimDate (DateID, FullDate, Day, Month, Quarter, Year, WeekOfYear, DayOfWeek, IsWeekend, MonthName, QuarterName)
SELECT 
    DATE_FORMAT(date_add('2020-01-01', INTERVAL n DAY), '%Y%m%d') as DateID,
    date_add('2020-01-01', INTERVAL n DAY) as FullDate,
    DAY(date_add('2020-01-01', INTERVAL n DAY)) as Day,
    MONTH(date_add('2020-01-01', INTERVAL n DAY)) as Month,
    QUARTER(date_add('2020-01-01', INTERVAL n DAY)) as Quarter,
    YEAR(date_add('2020-01-01', INTERVAL n DAY)) as Year,
    WEEK(date_add('2020-01-01', INTERVAL n DAY), 1) as WeekOfYear,
    DAYOFWEEK(date_add('2020-01-01', INTERVAL n DAY)) as DayOfWeek,
    CASE WHEN DAYOFWEEK(date_add('2020-01-01', INTERVAL n DAY)) IN (1, 7) THEN TRUE ELSE FALSE END as IsWeekend,
    MONTHNAME(date_add('2020-01-01', INTERVAL n DAY)) as MonthName,
    CONCAT('Q', QUARTER(date_add('2020-01-01', INTERVAL n DAY))) as QuarterName
FROM (
    SELECT a.N + b.N * 10 + c.N * 100 + d.N * 1000 + e.N * 10000 as n
    FROM (SELECT 0 as N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a
    CROSS JOIN (SELECT 0 as N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
    CROSS JOIN (SELECT 0 as N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) c
    CROSS JOIN (SELECT 0 as N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) d
    CROSS JOIN (SELECT 0 as N UNION ALL SELECT 1 UNION ALL SELECT 2) e
) numbers
WHERE date_add('2020-01-01', INTERVAL n DAY) <= '2030-12-31'
ORDER BY n;