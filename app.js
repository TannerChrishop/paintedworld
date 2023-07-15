var rowpos = [];
rowpos.length = 11;
rowpos[0] = 0, rowpos[1] = 0, rowpos[2] = 0, rowpos[3] = 0, rowpos[4] = 0, rowpos[5] = 0, rowpos[6] = 0, 
rowpos[7] = 0, rowpos[8] = 0, rowpos[9] = 0, rowpos[10] = 0, rowpos[11] = 0;

var leftarrow1 = document.getElementById('leftarrow1').addEventListener("click", cycleleft.bind(0 , 1));
var rightarrow1 = document.getElementById('rightarrow1').addEventListener("click", cycleright.bind(0, 1));

var leftarrow2 = document.getElementById('leftarrow2').addEventListener("click", cycleleft.bind(0 , 2));
var rightarrow2 = document.getElementById('rightarrow2').addEventListener("click", cycleright.bind(0 , 2));

var leftarrow3 = document.getElementById('leftarrow3').addEventListener("click", cycleleft.bind(0, 3));
var rightarrow3 = document.getElementById('rightarrow3').addEventListener("click", cycleright.bind(0, 3));

var leftarrow4 = document.getElementById('leftarrow4').addEventListener("click", cycleleft.bind(0, 4));
var rightarrow4 = document.getElementById('rightarrow4').addEventListener("click", cycleright.bind(0, 4));

var leftarrow5 = document.getElementById('leftarrow5').addEventListener("click", cycleleft.bind(0, 5));
var rightarrow5 = document.getElementById('rightarrow5').addEventListener("click", cycleright.bind(0, 5));

var leftarrow6 = document.getElementById('leftarrow6').addEventListener("click", cycleleft.bind(0, 6));
var rightarrow6 = document.getElementById('rightarrow6').addEventListener("click", cycleright.bind(0, 6));

var leftarrow7 = document.getElementById('leftarrow7').addEventListener("click", cycleleft.bind(0, 7));
var rightarrow7 = document.getElementById('rightarrow7').addEventListener("click", cycleright.bind(0, 7));

var leftarrow8 = document.getElementById('leftarrow8').addEventListener("click", cycleleft.bind(0, 8));
var rightarrow8 = document.getElementById('rightarrow8').addEventListener("click", cycleright.bind(0, 8));

var leftarrow9 = document.getElementById('leftarrow9').addEventListener("click", cycleleft.bind(0, 9));
var rightarrow9 = document.getElementById('rightarrow9').addEventListener("click", cycleright.bind(0, 9));

var leftarrow10 = document.getElementById('leftarrow10').addEventListener("click", cycleleft.bind(0, 10));
var rightarrow10 = document.getElementById('rightarrow10').addEventListener("click", cycleright.bind(0, 10));

var leftarrow11 = document.getElementById('leftarrow11').addEventListener("click", cycleleft.bind(0, 11));
var rightarrow11 = document.getElementById('rightarrow11').addEventListener("click", cycleright.bind(0, 11));



var x = [];
x.length = 11;
x[0] = [];
x[0].length = 21;
x[1] = [];
x[1].length = 11;
x[2] = [];
x[2].length = 14;
x[3] = [];
x[3].length = 5;
x[4] = [];
x[4].length = 7;
x[5] = [];
x[5].length = 4;
x[6] = [];
x[6].length = 7;
x[7] = [];
x[7].length = 10;
x[8] = [];
x[8].length = 8;
x[9] = [];
x[9].length = 12;
x[10] = [];
x[10].length = 7;

x[0][0] = "Photos/placeholder.jpg";
x[0][1] = "Photos/row1/col0.jpg";
x[0][2] = "Photos/row1/col1.jpg";
x[0][3] = "Photos/row1/col2.jpg";
x[0][4] = "Photos/row1/col3.jpg";
x[0][5] = "Photos/row1/col4.jpg";
x[0][6] = "Photos/row1/col5.jpg";
x[0][7] = "Photos/row1/col6.jpg";
x[0][8] = "Photos/row1/col7.jpg";
x[0][9] = "Photos/row1/col8.jpg";
x[0][10] = "Photos/row1/col9.jpg";
x[0][11] = "Photos/row1/col10.jpg";
x[0][12] = "Photos/row1/col11.jpg";
x[0][13] = "Photos/row1/col12.jpg";
x[0][14] = "Photos/row1/col13.jpg";
x[0][15] = "Photos/row1/col14.jpg";
x[0][16] = "Photos/row1/col15.jpg";
x[0][17] = "Photos/row1/col16.jpg";
x[0][18] = "Photos/row1/col17.jpg";
x[0][19] = "Photos/row1/col18.jpg";
x[0][20] = "Photos/row1/col19.jpg";

x[1][0] = "Photos/placeholder.jpg";
x[1][1] = "Photos/row2/col0.jpg";
x[1][2] = "Photos/row2/col1.jpg";
x[1][3] = "Photos/row2/col2.jpg";
x[1][4] = "Photos/row2/col3.jpg";
x[1][5] = "Photos/row2/col4.jpg";
x[1][6] = "Photos/row2/col5.jpg";
x[1][7] = "Photos/row2/col6.jpg";
x[1][8] = "Photos/row2/col7.jpg";
x[1][9] = "Photos/row2/col8.jpg";
x[1][10] = "Photos/row2/col9.jpg";

x[2][0] = "Photos/placeholder.jpg";
x[2][1] = "Photos/row3/col0.jpg";
x[2][2] = "Photos/row3/col1.jpg";
x[2][3] = "Photos/row3/col2.jpg";
x[2][4] = "Photos/row3/col3.jpg";
x[2][5] = "Photos/row3/col4.jpg";
x[2][6] = "Photos/row3/col5.jpg";
x[2][7] = "Photos/row3/col6.jpg";
x[2][8] = "Photos/row3/col7.jpg";
x[2][9] = "Photos/row3/col8.jpg";
x[2][10] = "Photos/row3/col9.jpg";
x[2][11] = "Photos/row3/col10.jpg";
x[2][12] = "Photos/row3/col11.jpg";
x[2][13] = "Photos/row3/col12.jpg";

x[3][0] = "Photos/placeholder.jpg";
x[3][1] = "Photos/row4/col0.jpg";
x[3][2] = "Photos/row4/col1.jpg";
x[3][3] = "Photos/row4/col2.jpg";
x[3][4] = "Photos/row4/col3.jpg";

x[4][0] = "Photos/placeholder.jpg";
x[4][1] = "Photos/row5/col0.jpg";
x[4][2] = "Photos/row5/col1.jpg";
x[4][3] = "Photos/row5/col2.jpg";
x[4][4] = "Photos/row5/col3.jpg";
x[4][5] = "Photos/row5/col4.jpg";
x[4][6] = "Photos/row5/col5.jpg";

x[5][0] = "Photos/placeholder.jpg";
x[5][1] = "Photos/row6/col0.jpg";
x[5][2] = "Photos/row6/col1.jpg";
x[5][3] = "Photos/row6/col2.jpg";
x[5][4] = "Photos/row6/col3.jpg";

x[6][0] = "Photos/placeholder.jpg";
x[6][1] = "Photos/row7/col0.jpg";
x[6][2] = "Photos/row7/col1.jpg";
x[6][3] = "Photos/row7/col2.jpg";
x[6][4] = "Photos/row7/col3.jpg";
x[6][5] = "Photos/row7/col4.jpg";
x[6][6] = "Photos/row7/col5.jpg";

x[7][0] = "Photos/placeholder.jpg";
x[7][1] = "Photos/row8/col0.jpg";
x[7][2] = "Photos/row8/col1.jpg";
x[7][3] = "Photos/row8/col2.jpg";
x[7][4] = "Photos/row8/col3.jpg";
x[7][5] = "Photos/row8/col4.jpg";
x[7][6] = "Photos/row8/col5.jpg";
x[7][7] = "Photos/row8/col6.jpg";
x[7][8] = "Photos/row8/col7.jpg";
x[7][9] = "Photos/row8/col8.jpg";

x[8][0] = "Photos/placeholder.jpg";
x[8][1] = "Photos/row9/col0.jpg";
x[8][2] = "Photos/row9/col1.jpg";
x[8][3] = "Photos/row9/col2.jpg";
x[8][4] = "Photos/row9/col3.jpg";
x[8][5] = "Photos/row9/col4.jpg";
x[8][6] = "Photos/row9/col5.jpg";
x[8][7] = "Photos/row9/col6.jpg";

x[9][0] = "Photos/placeholder.jpg";
x[9][1] = "Photos/row10/col0.jpg";
x[9][2] = "Photos/row10/col1.jpg";
x[9][3] = "Photos/row10/col2.jpg";
x[9][4] = "Photos/row10/col3.jpg";
x[9][5] = "Photos/row10/col4.jpg";
x[9][6] = "Photos/row10/col5.jpg";
x[9][7] = "Photos/row10/col6.jpg";
x[9][8] = "Photos/row10/col7.jpg";
x[9][9] = "Photos/row10/col8.jpg";
x[9][10] = "Photos/row10/col9.jpg";
x[9][11] = "Photos/row10/col10.jpg";

x[10][0] = "Photos/placeholder.jpg";
x[10][1] = "Photos/row11/col0.jpg";
x[10][2] = "Photos/row11/col1.jpg";
x[10][3] = "Photos/row11/col2.jpg";
x[10][4] = "Photos/row11/col3.jpg";
x[10][5] = "Photos/row11/col4.jpg";
x[10][6] = "Photos/row11/col5.jpg";

var y =[];
y.length = 11;
y[0] = [], y[1] = [], y[2] = [], y[3] = [], y[4] = [], y[5] = [], y[6] = [], y[7] = [], y[8] = [], y[9] = [], y[10] = [], y[10] = [];
y[0].length = 3, y[1].length = 3, y[2].length = 3, y[3].length = 3, y[4].length = 3, y[5].length = 3, 
y[6].length = 3, y[7].length = 3, y[8].length = 3, y[9].length = 3, y[10].length = 3;

y[0][0] = document.getElementById("row1col0")
y[0][1] = document.getElementById("row1col1")
y[0][2] = document.getElementById("row1col2")
y[0][0].src = x[0][0];
y[0][1].src = x[0][1];
y[0][2].src = x[0][2];


y[1][0] = document.getElementById("row2col0")
y[1][1] = document.getElementById("row2col1")
y[1][2] = document.getElementById("row2col2")
y[1][0].src = x[1][0];
y[1][1].src = x[1][1];
y[1][2].src = x[1][2];

y[2][0] = document.getElementById("row3col0");
y[2][1] = document.getElementById("row3col1");
y[2][2] = document.getElementById("row3col2");
y[2][0].src = x[2][0];
y[2][1].src = x[2][1];
y[2][2].src = x[2][2];

y[3][0] = document.getElementById("row4col0");
y[3][1] = document.getElementById("row4col1");
y[3][2] = document.getElementById("row4col2");
y[3][0].src = x[3][0];
y[3][1].src = x[3][1];
y[3][2].src = x[3][2];

y[4][0] = document.getElementById("row5col0");
y[4][1] = document.getElementById("row5col1");
y[4][2] = document.getElementById("row5col2");
y[4][0].src = x[4][0];
y[4][1].src = x[4][1];
y[4][2].src = x[4][2];

y[5][0] = document.getElementById("row6col0");
y[5][1] = document.getElementById("row6col1");
y[5][2] = document.getElementById("row6col2");
y[5][0].src = x[5][0];
y[5][1].src = x[5][1];
y[5][2].src = x[5][2];

y[6][0] = document.getElementById("row7col0");
y[6][1] = document.getElementById("row7col1");
y[6][2] = document.getElementById("row7col2");
y[6][0].src = x[6][0];
y[6][1].src = x[6][1];
y[6][2].src = x[6][2];

y[7][0] = document.getElementById("row8col0");
y[7][1] = document.getElementById("row8col1");
y[7][2] = document.getElementById("row8col2");
y[7][0].src = x[7][0];
y[7][1].src = x[7][1];
y[7][2].src = x[7][2];

y[8][0] = document.getElementById("row9col0");
y[8][1] = document.getElementById("row9col1");
y[8][2] = document.getElementById("row9col2");
y[8][0].src = x[8][0];
y[8][1].src = x[8][1];
y[8][2].src = x[8][2];

y[9][0] = document.getElementById("row10col0");
y[9][1] = document.getElementById("row10col1");
y[9][2] = document.getElementById("row10col2");
y[9][0].src = x[9][0];
y[9][1].src = x[9][1];
y[9][2].src = x[9][2];

y[10][0] = document.getElementById("row11col0");
y[10][1] = document.getElementById("row11col1");
y[10][2] = document.getElementById("row11col2");
y[10][0].src = x[10][0];
y[10][1].src = x[10][1];
y[10][2].src = x[10][2];


function cycleleft (row){
    for(var i = 0; i < row; i++){
    }
    if(rowpos[i-1] > 0) {
        rowpos[i-1]--;
        y[i-1][0].src = x[i-1][rowpos[i-1]]
        y[i-1][1].src = x[i-1][rowpos[i-1]+1]
        y[i-1][2].src = x[i-1][rowpos[i-1]+2]
    }
}

function cycleright (row, that){
    for(var i = 0; i < row; i++){
    }
    if(rowpos[i-1] < x[i-1].length-3) {
        rowpos[i-1]++;
        y[i-1][0].src = x[i-1][rowpos[i-1]]
        y[i-1][1].src = x[i-1][rowpos[i-1]+1]
        y[i-1][2].src = x[i-1][rowpos[i-1]+2]
    }
}