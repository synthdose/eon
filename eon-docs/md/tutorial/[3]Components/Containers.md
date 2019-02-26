*[
  function changeTheme(playground){
    var eon = playground._refs.iframe.contentWindow.eon;
    eon.theme= eon.theme == "claro" ? "noire" : "claro";
  }
]*
[Gutter]<>
The gutter element is a container with the ability to separate its content in two sections divided with a draggable splitter, providing a flexible manipulation over the size of the sections and displaying. This kind of components is frequently used on code editor programs.

Gutter sections can be collapsible for dynamic behavior. On the contrary, the gutter provides other properties like allowDrag to reflect a static content layout.

*(
<doc-playground label="Vertical gutter" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-gutter"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-gutter',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase {
           width: 100%;
        }
        doc-showcase .doc-showcase-content {
          height: 250px;
          width: 100%;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
      <eon-gutter type="horizontal" collapsible="true">
        <eon-section class="section">
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
          <div class="gutter-box blue"></div>
        </eon-section>
        <eon-section>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
          <div class="gutter-box orange"></div>
        </eon-section>
      </eon-gutter>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .gutter-box {
          height: 50px;
          width: 50px;
          min-width: 50px;
          margin: 8px;
          background: #76bb72;
      }
      .blue {
        background-color: #7296bb !important;
      }

      .red {
        background-color: #b36a6a;
      }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "text":"theme", "icon":"bubble-chart"}}
  </template>
</doc-playground>
)*


Nothing prevents you from declaring nested eon-gutter elements without losing customization.


*(
<doc-playground label="Nested gutter" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-gutter"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-gutter',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
        doc-showcase {
           width: 100%;
        }
        doc-showcase .doc-showcase-content {
          height: 350px;
          width: 100%;
        }
        .doc-showcase-title {
            display: none;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase>
    <eon-gutter type="vertical" collapsible="true">
        <eon-section>
          <eon-gutter collapsible="false">
            <eon-section class="section">
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
              <div class="gutter-box blue"></div>
            </eon-section>
            <eon-section>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
              <div class="gutter-box orange"></div>
            </eon-section>
          </eon-gutter>
        </eon-section>
        <eon-section>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
          <div class="gutter-box red"></div>
        </eon-section>
      </eon-gutter>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .gutter-box {
          height: 50px;
          width: 50px;
          min-width: 50px;
          margin: 8px;
          background: #76bb72;
      }
      .blue {
        background-color: #7296bb !important;
      }

      .orange {
        background-color: #bb9772;
      }
      .red {
        background-color: #b36a6a;
      }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "text":"theme", "icon":"bubble-chart"}}
  </template>
</doc-playground>
)*

[Headerpanel]<>
The Headerpanel element works as a simple container but provides a bunch of properties to simulate a card layout with a title header, action and remove buttons and scrollable content.

*(
<doc-playground label="Flexible behavior" format="true" html="true" js="true" css="true" selector="body">
  <template type="html">
    <doc-head>
      <script src='framework/doc-eon/eon/eon.js'></script>
      <script>
        eon.themeSchema = {
          claro: ["eon-headerpanel"]
        }
      </script>
      <script>
        eon.import([
          'framework/doc-eon/eon/ui/eon-headerpanel',
          'framework/doc-eon/custom/doc-playground/doc-showcase'
        ])
      </script>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
        }
      </style>
  </doc-head>
  <doc-body>
    <doc-showcase label="Growing header">
        <eon-headerpanel id="growing-headerpanel" default-style="false" header="grow" class="headerpanel" header-content="Custom" action-button="changeSquaresColor('growing-headerpanel')" close-button="none" close-button-class="d-black-close">
          <div class="headerpanel-square red"></div>
          <div class="headerpanel-square red"></div>
          <div class="headerpanel-square red"></div>
          <div class="headerpanel-square red"></div>
        </eon-headerpanel>
      </doc-showcase>
      <doc-showcase label="Simple panel">
        <eon-headerpanel class="headerpanel" default-style="false">
        </eon-headerpanel>
      </doc-showcase>
    </doc-showcase>
  </doc-body>
  </template>
   <template type="css">
      .red {
        background-color: #b36a6a;
      }
      .headerpanel {
        width: 200px;
        height: 200px;
        transition: all .2s;
      }
      .headerpanel-square {
        width: 100%;
        height: 100px;
        margin-top: 12px;
        transition: all .2s;
      }
  </template>
  <template type="js">
    var colors = ["", "#b78f47", "#2a9a9a", "#8c47b7", "#795829", "#b1616f", "#2b4b94"];

    function changeSquaresColor(id) {
      var squares = document.querySelector("#" + id).querySelectorAll(".headerpanel-square");
      var color = Math.floor((Math.random() * 6) + 1);
      // Change squares color
      for (var index in squares) {
        squares[index].style.backgroundColor = colors[color];
      }
    }
  </template>
  <template type="footer">
    {"button":{"action":"changeTheme", "text":"theme", "icon":"bubble-chart"}}
  </template>
</doc-playground>
)*

[Grid]<>
Also known as `table`, displays a large number of data using rows and columns.

*(
<doc-playground label="Common Usage" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-grid','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
            <doc-showcase label="Default">
                <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:340px" page-size="8" autofit="false">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
            <doc-showcase label="Resizable">
                <eon-grid footer="true" entries-count="false" row-min-height="80" column-min-width="200"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:340px" page-size="8" autofit="false">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*

## Autofit Type

This type of grid is meant to reduce the amount of headaches when dealing with grid pages as it completely removes the need of scrolling vertically, it only shows the amount of rows that fit the in the available space.

*(
<doc-playground label="Autofit" html="true" js="true" css="true" selector="body">
    <template type="html">
        <head>
            <script src='framework/doc-eon/eon/eon.js'></script>
            <script>eon.import(['framework/doc-eon/eon/ui/eon-grid','framework/doc-eon/custom/doc-playground/doc-showcase']);</script>
        </head>
        <body>
            <doc-showcase label='Smaller Space'>
                <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200" autofit="true"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:260px">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
            <doc-showcase label='Larger Space'>
                <eon-grid resizable="false" footer="true" entries-count="false" row-min-height="80" column-min-width="200" autofit="true"
                    columns="name, lastname, age, phone" headers="Name, Lastname, Age, Phone, DNI" style="height:580px">
                    <eon-grid-row>
                        <eon-grid-cell column="name">John</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jill</eon-grid-cell>
                        <eon-grid-cell column="lastname">Smith</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Joseph</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Charles</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Jaime</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Johan</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">David</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Samuel</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="age">16</eon-grid-cell>
                        <eon-grid-cell column="phone">3345</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Vera</eon-grid-cell>
                        <eon-grid-cell column="lastname">Doe</eon-grid-cell>
                        <eon-grid-cell column="phone">666676666</eon-grid-cell>
                    </eon-grid-row>
                    <eon-grid-row>
                        <eon-grid-cell column="name">Janine</eon-grid-cell>
                        <eon-grid-cell column="lastname">Jackson</eon-grid-cell>
                        <eon-grid-cell column="age">27</eon-grid-cell>
                        <eon-grid-cell column="phone">766565454</eon-grid-cell>
                    </eon-grid-row>
                    </eon-grid>
            </doc-showcase>
        </body>
    </template>
    <template type="css">
        .doc-showcase-content{display:flex;}
        .doc-showcase-content eon-button{margin:0 5px;}
    </template>
</doc-playground>
)*


