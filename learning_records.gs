function learning_records() {
  //get active spreadsheet data
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  //const sheet = SpreadsheetApp.getActiveSheet();
  const ss = sheet.getDataRange().getValues();
@const learner_name = sheet.getRange("F1").getValue();

  //number of data 
  var numbers_of_data = 0;
    for (let j = sheet.getLastRow() - 1; j > 0; j--) {
      if ( ss[j][1] !== '' && ss[j][2] !== undefined) {
        var numbers_of_data = j-1;
        break;
      } 
    }

  //types 
  const pickedtypes = ss.map(item => item[2]);
  var tmp = pickedtypes.shift();
  const types = Array.from(new Set(pickedtypes))
//  console.log(pickedtypes);
//  console.log(types);

  //sum of time 
  const time_sum = [...Array(types.length)].map( e => 0 );
  const month_sum = [...Array(types.length)].map( e => 0 );
  var date = new Date();
  var thisyear = date.getYear();
  var thismonth = date.getMonth();
  for (let j = 0; j < types.length; j++) {
    ss.map(function(item) { 
      if (item.indexOf(types[j]) !== -1) {
        time_sum[j] += item[3]/60;
        if (item[1].getYear() == thisyear && item[1].getMonth() == thismonth) {
          month_sum[j] += item[3]/60;
        }
        //console.log(item);
      }
    });
  }

  //create a result tabel around I1 cell 
  const chart_title = 'Learning Records: '+learner_name;
  const item_head0 = 'Activity';
  const item_head1 = 'This month';
  const item_head2 = 'Total';
  sheet.getRange("J1").setValue(chart_title);
  sheet.getRange("I2").setValue(item_head0);
  sheet.getRange("J2").setValue(item_head1);
  sheet.getRange("K2").setValue(item_head2);
  for (let j = 0; j < types.length; j++) {
    sheet.getRange(j+3,9).setValue(types[j]);
    sheet.getRange(j+3,10).setValue(month_sum[j]);
    sheet.getRange(j+3,11).setValue(time_sum[j]);
  }

  var range = sheet.getRange(2,9,types.length+1,3);
  const colors = ["blue", "green", "maroon", "red", "purple", "fuchsia", "lime", "olive", "yellow", "navy", "teal", "aqua", "black", "silver", "gray"];
  var chart=sheet.newChart()
    .addRange(range)
    .asBarChart()
    .setPosition(3,2,0,0)
    .setOption('title',chart_title)
    .setOption('legend', {position: 'top', textStyle: {color: 'GRAY', fontSize: 16}})
    .setColors(colors)
    .setNumHeaders(1)
    .build();
  sheet.insertChart(chart);
//    .setChartType(Charts.ChartType.BAR)
//    .setOption('colors', colors)

};

