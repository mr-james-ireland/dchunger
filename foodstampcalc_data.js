// Data version - update with each change!  This will be displayed at the bottom of the page.
var CALC_DATA_VERSION = "2025.10.01 V2.14"; // 

// DC Hunger home page
var DC_HUNGER_URL = "http://dchunger.org";
var DC_HUNGER_CALC_URL = ".";

// Minimum amount for SNAP benefits
var SNAP_MIN_AMT = 24.00; // 10.1.25
var SNAP_MIN_EXP = 24.00; // 10.1.25

// Note: DC’s minimum SNAP benefit is now $30 thanks to the SNAP Expansion Act of 2014.

// gross monthly income standards for categorical eligibility (based on 2025 figures)
var INCOME_STDS = new Array();           
INCOME_STDS[1] = 2610.00;
INCOME_STDS[2] = 3526.00;
INCOME_STDS[3] = 4442.00;
INCOME_STDS[4] = 5360.00;
INCOME_STDS[5] = 6276.00;
INCOME_STDS[6] = 7196.00;
INCOME_STDS[7] = 8110.00;
INCOME_STDS[8] = 9026.00;
var MAX_INCOME_STDS_HH = 8;
var ADDITIONAL_INCOME_STD = 918.00;

// standard deduction (based on 2025 figures)
var STANDARD_DEDUCTIONS = new Array();
STANDARD_DEDUCTIONS[1] = 209;
STANDARD_DEDUCTIONS[2] = 209;
STANDARD_DEDUCTIONS[3] = 209;
STANDARD_DEDUCTIONS[4] = 223;
STANDARD_DEDUCTIONS[5] = 261;
STANDARD_DEDUCTIONS[6] = 299;
STANDARD_DEDUCTIONS[7] = 299;
STANDARD_DEDUCTIONS[8] = 299;
var MAX_ASSIST_UNIT_SIZE = 8;
var MAX_STANDARD_DEDUCTION = 299;

// maximum food stamp allotments for household size (based on 2025 figures)
var MAX_ALLOTMENTS = new Array();
MAX_ALLOTMENTS[1] = 298;
MAX_ALLOTMENTS[2] = 546;
MAX_ALLOTMENTS[3] = 785;
MAX_ALLOTMENTS[4] = 994;
MAX_ALLOTMENTS[5] = 1183;
MAX_ALLOTMENTS[6] = 1421;
MAX_ALLOTMENTS[7] = 1571;
MAX_ALLOTMENTS[8] = 1789;
var MAX_ALLOTMENTS_HH = 8;
var ADDITIONAL_ALLOTMENT = 218;

// maximum allowable monthly net income standards 100% FPL (based on 2025 figures)
var MAX_ALLOW_INCOME_STD = new Array();
MAX_ALLOW_INCOME_STD[1] = 1305.00;
MAX_ALLOW_INCOME_STD[2] = 1763.00;
MAX_ALLOW_INCOME_STD[3] = 2221.00;
MAX_ALLOW_INCOME_STD[4] = 2680.00;
MAX_ALLOW_INCOME_STD[5] = 3138.00;
MAX_ALLOW_INCOME_STD[6] = 3596.00;
MAX_ALLOW_INCOME_STD[7] = 4055.00;
MAX_ALLOW_INCOME_STD[8] = 4513.00;

var MAX_ALLOW_INCOME_STD_HH = 8;
var ADDITIONAL_ALLOW_INCOME_STD = 459.00;            

// medical expenses
var MIN_MEDICAL_EXPENSE = 35;

// standard utility deductions 10/1/25 
var UTILITY_HEATING_AND_COOLING = 384.00; 
var UTILITY_TWO_UTILITIES = 339.00; 
var UTILITY_ONE_UTILITY = 88.00;
var UTILITY_PHONE = 74.00;
var SHELTER_CAP = 672.00; 

// Note: Due to changes in implementation of Heat and Eat in FY 2017 (now implemented at point of application), all standard utility deductions should be set at $327.
