
let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));

var board_solution = [
  [15],
  [2,2],
  [1,1,2,1,1],
  [1,1,2,1,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,2,1,2,1],
  [1,2,1,1,2,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,1,2,1,1],
  [1,1,2,1,1],
  [2,2],
  [15], //END OF VERTICAL ROW HEADER
  [15],
  [2,2],
  [1,1,2,1,1],
  [1,1,2,1,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,2,1,1,2,1],
  [1,2,1,2,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,1,1,1],
  [1,1,2,1,1],
  [1,1,2,1,1],
  [2,2],
  [15]
              ];

var answer_matrix = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,0,1,0,0,0,0,1,1,0,0,0,1,0,1],
  [1,0,0,1,0,0,0,1,1,0,0,1,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,0,0,1,0,1,0,0,1,1,0,1],
  [1,0,1,1,0,0,0,1,0,0,0,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,1,0,0,0,1,1,0,0,1,0,0,1],
  [1,0,1,0,0,0,0,1,1,0,0,0,1,0,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var game_board;

var mouseCurrent;
var click_down = false;

function create_board(check = answer_matrix, actual_solution = board_solution){
  document.getElementById("table").innerHTML = "";

  var buttons = document.getElementsByClassName("button");
  buttons[0].style.display = "inline";
  buttons[1].style.display = "inline";

  create_table(check, actual_solution);
}


function ShowSolution(dimension = 15, check = answer_matrix)
{
  var vector1 = 0;
  while(vector1 < dimension)
  {
    var vector2 = 0;
    while(vector2 < dimension)
    {
      var cell = document.getElementById((vector1 + "-" + vector2));
      if(check[vector1][vector2] == 1)
      {
        cell.style.background = "blue";
        game_board[vector1][vector2] = 1;
      }
      else if(check[vector1][vector2] == 0)
      {
        cell.style.background = "#d1e6d2";
        game_board[vector1][vector2] = 0;
      }
      vector2++;
    }
    vector1++;
  }

}




function update_cells(arr, top, cell)
{
  var vector1 = 0;
  while(vector1 < arr.length)
  {
    if(top == 1)
    {
      cell.innerHTML += arr[vector1] + "<br>";
    }
    else
    {
      cell.innerHTML += arr[vector1] + " ";
    }
    vector1++;
  }
}

function create_table(check = answer_matrix, actual_solution = board_solution){
  var board_size;
  if(window.innerWidth > window.innerHeight)
      board_size = window.innerHeight;
  if(window.innerWidth <= window.innerHeight)
      board_size =  window.innerWidth;
  var num = 16;
  var counter = 0;
  var counter2;
  var arrayCount = 0;
  var t = document.getElementById('table');

  game_board = Array2D(num-1, num-1);

  while(counter < num)
        {
          counter2 = 0;
          var row = t.insertRow(-1);
          while(counter2 < num)
          {
            var cell = row.insertCell(-1);

            if(counter == 0 && counter2 == 0)
            {
              cell.classList.add("header-top");

              counter2++;
            }
            else if(counter==0)
            {
              cell.classList.add("header-top");
              update_cells(actual_solution[arrayCount], 1, cell);
              arrayCount++;

              counter2++;
            }

            else if(counter2==0)
            {
              cell.classList.add("header-top");
              update_cells(actual_solution[arrayCount], 0, cell);
              arrayCount++;

              counter2++;
            }

            else
            {
              cell.classList.add("cell");
              cell.style.width = Math.floor(board_size/(num+3)) + "px";
              cell.style.height = Math.floor(board_size/(num+3)) + "px";
              cell.setAttribute("onmouseup", "button_press(this.id, 3)");
              cell.setAttribute("onmousemove", "button_press(this.id, 2)");
              cell.setAttribute("onmousedown", "button_press(this.id, 1)");
              cell.setAttribute("id", ((counter-1).toString() + "-" + (counter2-1).toString()));
              counter2 = counter2 + 1;
            }


          }

          counter = counter + 1;
        }
}

function check_win(check = answer_matrix)
{
  var vector1 = 0;
  var win = true;
  while(vector1 < check.length)
  {
    var vector2 = 0;
    while(vector2 < check.length)
    {
      if(check[vector1][vector2] != game_board[vector1][vector2])
      {
        win = false;
      }
      vector2++;
    }
    vector1++;
  }
  if(win)
  {
    console.log("You won!")

    setTimeout(() => { alert("Congratulations, you win!"); }, 100);
  }

}

function Togglecell(id){
  var idVar = document.getElementById(id);
  var id_index = id.split('-');
  if(idVar.style.background != "blue")
  {
    idVar.style.background = "blue";
    game_board[id_index[0]][id_index[1]] = 1;
  }
  else
  {
    idVar.style.background = "#d1e6d2";
    game_board[id_index[0]][id_index[1]] = 0;

  }
  check_win();
}

function button_press(id = null, pos)
{
  if(pos == 1 && click_down == false)
  {
    Togglecell(id);
    mouseCurrent = id;
    click_down = true;
  }
  else if(pos == 2 && id != mouseCurrent && click_down)
  {
    Togglecell(id);
    mouseCurrent = id;
  }
  else if(pos == 3)
  {
    mouseCurrent = id;
    click_down = false;
  }
}
