var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Length";
unit[0] = new Array("Meter (m)", "Centimeter (cm)", "Kilometer (km)",   "Foot (ft)", "Inch (in)");
factor[0] = new Array(1, .01, 1000,  .3048, .0254,  .000001,  .001, 1E-9);

property[1] = "Weight";
unit[1] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)",  "Ton (long)", "Ton (short)", "Ton (metric)");
factor[1] = new Array(1, .001, 1e-6, .000000001,  1016.047, 907.1847, 1000);

property[2] = "Area";
unit[2] = new Array("Square meter (m^2)", "Acre (acre)",  "Square centimeter", "Square kilometer",  "Square foot (ft^2)", "Square inch (in^2)");
factor[2] = new Array(1, 4046.856,  .0001, 1000000,  9.290304E-02, 6.4516E-04);

property[3] = "Volume & Capacity";
unit[3] = new Array("Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter",  "Cubic foot",  "Cubic inch (in^3)", "Liter (new)");
factor[3] = new Array(1, .000001, .000000001,  .02831685,  .00001638706, .001);
// !!! Caution: Temperature requires an increment as well as a multiplying factor
// !!! and that's why it's handled differently
// !!! Be VERY careful in how you change this behavior
property[4] = "Temperature";
unit[4] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)");
factor[4] = new Array(1, 0.555555555555, 1);
tempIncrement = new Array(0, -32, -273.15);

property[5] = "Time";
unit[5] = new Array("Second (sec)", "Day", "Hour", "Minute ", "Month", "Year");
factor[5] = new Array(1, 86400, 3600, 60, 2628900, 31557600);




// ===========
//  Functions
// ===========

function UpdateUnitMenu(propMenu, unitMenu) {
  
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
 
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {

  var sourceValue = sourceForm.unit_input.value;


  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {

    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {

  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;


  propIndex = document.property_form.the_menu.selectedIndex;


  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];


  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];

 
  result = sourceForm.unit_input.value;

  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

 
  result = result / targetFactor;
  
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  targetForm.unit_input.value = result;
}


window.onload = function(e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}


document.getElementByClass('numbersonly').addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All 
      (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
      (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
      (key >= 35 && key <= 40) || // End, Home, Arrows
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
      (key >= 96 && key <= 105) // Numpad
      (key == 190) // Numpad
    )) e.preventDefault();
});