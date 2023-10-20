// Data version - update with each change!  This will be displayed at the bottom of the page.
var CALC_DATA_VERSION = "2023.10.19 V2.11"; // 

// DC Hunger home page
var DC_HUNGER_URL = "http://dchunger.org";
var DC_HUNGER_CALC_URL = ".";

// Minimum amount for SNAP benefits
var SNAP_MIN_AMT = 30.00; // changed from 30 on 10.01.2023
var SNAP_MIN_EXP = 30.00; // OLD: Note: DC’s minimum SNAP benefit is now $30 thanks to the SNAP Expansion Act of 2014.

// Note: DC’s minimum SNAP benefit is now $30 thanks to the SNAP Expansion Act of 2014.

// gross monthly income standards for categorical eligibility (based on 10/01/23 figures)
var INCOME_STDS = new Array();           
INCOME_STDS[1] = 2430.00;
INCOME_STDS[2] = 3287.00;
INCOME_STDS[3] = 4143.00;
INCOME_STDS[4] = 5000.00;
INCOME_STDS[5] = 5857.00;
INCOME_STDS[6] = 6713.00;
INCOME_STDS[7] = 7570.00;
INCOME_STDS[8] = 8427.00;
var MAX_INCOME_STDS_HH = 8;
var ADDITIONAL_INCOME_STD = 857.00;

// standard deduction (based on 10/01/23 figures)
var STANDARD_DEDUCTIONS = new Array();
STANDARD_DEDUCTIONS[1] = 198;
STANDARD_DEDUCTIONS[2] = 198;
STANDARD_DEDUCTIONS[3] = 198;
STANDARD_DEDUCTIONS[4] = 208;
STANDARD_DEDUCTIONS[5] = 244;
STANDARD_DEDUCTIONS[6] = 279;
STANDARD_DEDUCTIONS[7] = 279;
STANDARD_DEDUCTIONS[8] = 279;
var MAX_ASSIST_UNIT_SIZE = 8;
var MAX_STANDARD_DEDUCTION = 279;

// maximum food stamp allotments for household size (based on 10/01/2023 figures)
var MAX_ALLOTMENTS = new Array();
MAX_ALLOTMENTS[1] = 291;
MAX_ALLOTMENTS[2] = 535;
MAX_ALLOTMENTS[3] = 766;
MAX_ALLOTMENTS[4] = 973;
MAX_ALLOTMENTS[5] = 1155;
MAX_ALLOTMENTS[6] = 1386;
MAX_ALLOTMENTS[7] = 1532;
MAX_ALLOTMENTS[8] = 1751;
var MAX_ALLOTMENTS_HH = 8;
var ADDITIONAL_ALLOTMENT = 219;

// maximum allowable monthly net income standards 100% FPL (based on 10/01/23 figures)
var MAX_ALLOW_INCOME_STD = new Array();
MAX_ALLOW_INCOME_STD[1] = 1215.00;
MAX_ALLOW_INCOME_STD[2] = 1643.00;
MAX_ALLOW_INCOME_STD[3] = 2072.00;
MAX_ALLOW_INCOME_STD[4] = 2500.00;
MAX_ALLOW_INCOME_STD[5] = 2928.00;
MAX_ALLOW_INCOME_STD[6] = 3357.00;
MAX_ALLOW_INCOME_STD[7] = 3785.00;

var MAX_ALLOW_INCOME_STD_HH = 7;
var ADDITIONAL_ALLOW_INCOME_STD = 428.00;            

// medical expenses
var MIN_MEDICAL_EXPENSE = 35;

// standard utility deductions 10/01/23 
var UTILITY_HEATING_AND_COOLING = 360.00; 
var UTILITY_TWO_UTILITIES = 323.00; 
var UTILITY_ONE_UTILITY = 84.00;
var UTILITY_PHONE = 72.00;
var SHELTER_CAP = 672.00; 

// Note: Due to changes in implementation of Heat and Eat in FY 2017 (now implemented at point of application), all standard utility deductions should be set at $327.
