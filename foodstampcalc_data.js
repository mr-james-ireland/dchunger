// Data version - update with each change!  This will be displayed at the bottom of the page.
var CALC_DATA_VERSION = "2023.12.29 V2.12"; // 

// DC Hunger home page
var DC_HUNGER_URL = "http://dchunger.org";
var DC_HUNGER_CALC_URL = ".";

// Minimum amount for SNAP benefits
var SNAP_MIN_AMT = 23.00; // changed from 30 on 12.29.24
var SNAP_MIN_EXP = 23.00; // changed back to 23 on 12.29.24

// Note: DC’s minimum SNAP benefit is now $30 thanks to the SNAP Expansion Act of 2014.

// gross monthly income standards for categorical eligibility (based on 2024 figures)
var INCOME_STDS = new Array();           
INCOME_STDS[1] = 2510.00;
INCOME_STDS[2] = 3408.00;
INCOME_STDS[3] = 4304.00;
INCOME_STDS[4] = 5200.00;
INCOME_STDS[5] = 6098.00;
INCOME_STDS[6] = 6994.00;
INCOME_STDS[7] = 7890.00;
INCOME_STDS[8] = 8788.00;
var MAX_INCOME_STDS_HH = 8;
var ADDITIONAL_INCOME_STD = 898.00;

// standard deduction (based on 2024 figures)
var STANDARD_DEDUCTIONS = new Array();
STANDARD_DEDUCTIONS[1] = 204;
STANDARD_DEDUCTIONS[2] = 204;
STANDARD_DEDUCTIONS[3] = 204;
STANDARD_DEDUCTIONS[4] = 204;
STANDARD_DEDUCTIONS[5] = 254;
STANDARD_DEDUCTIONS[6] = 291;
STANDARD_DEDUCTIONS[7] = 291;
STANDARD_DEDUCTIONS[8] = 291;
var MAX_ASSIST_UNIT_SIZE = 8;
var MAX_STANDARD_DEDUCTION = 291;

// maximum food stamp allotments for household size (based on 2024 figures)
var MAX_ALLOTMENTS = new Array();
MAX_ALLOTMENTS[1] = 292;
MAX_ALLOTMENTS[2] = 536;
MAX_ALLOTMENTS[3] = 768;
MAX_ALLOTMENTS[4] = 975;
MAX_ALLOTMENTS[5] = 1158;
MAX_ALLOTMENTS[6] = 1390;
MAX_ALLOTMENTS[7] = 1536;
MAX_ALLOTMENTS[8] = 1756;
var MAX_ALLOTMENTS_HH = 8;
var ADDITIONAL_ALLOTMENT = 220;

// maximum allowable monthly net income standards 100% FPL (based on 2024 figures)
var MAX_ALLOW_INCOME_STD = new Array();
MAX_ALLOW_INCOME_STD[1] = 1255.00;
MAX_ALLOW_INCOME_STD[2] = 1703.33;
MAX_ALLOW_INCOME_STD[3] = 2151.67;
MAX_ALLOW_INCOME_STD[4] = 2600.00;
MAX_ALLOW_INCOME_STD[5] = 3048.33;
MAX_ALLOW_INCOME_STD[6] = 3496.67;
MAX_ALLOW_INCOME_STD[7] = 3945.00;

var MAX_ALLOW_INCOME_STD_HH = 7;
var ADDITIONAL_ALLOW_INCOME_STD = 448.33;            

// medical expenses
var MIN_MEDICAL_EXPENSE = 35;

// standard utility deductions 12/29/24 
var UTILITY_HEATING_AND_COOLING = 374.00; 
var UTILITY_TWO_UTILITIES = 339.00; 
var UTILITY_ONE_UTILITY = 88.00;
var UTILITY_PHONE = 74.00;
var SHELTER_CAP = 672.00; 

// Note: Due to changes in implementation of Heat and Eat in FY 2017 (now implemented at point of application), all standard utility deductions should be set at $327.
