import { DiTestResultsScene } from "./testResultsScene";

export class DiSingleTableResultsScene extends DiTestResultsScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.showSortedData = this.showSortedData.bind(this);
    }

    _sortTable(table) {
        // grabs column values from tbody rows, sorts them independently
        // and then re-adds them as sorted rows using the column arrays
        let tbody = table.querySelector("tbody");
        let rows = [...tbody.rows];
        tbody.innerHTML = "";
        let col1Vals = rows.map((tr) => {
            return parseFloat(tr.querySelectorAll("td")[0].innerText);
        });
        let col2Vals = rows.map((tr) => {
            return parseFloat(tr.querySelectorAll("td")[1].innerText);
        });
        col1Vals.sort((a, b) => a - b);
        col2Vals.sort((a, b) => a - b);
        for (let i = 0; i < col1Vals.length; i++) {
            let tr = document.createElement("tr");
            let col1 = document.createElement("td");
            let col2 = document.createElement("td");
            col1.innerText = col1Vals[i];
            col2.innerText = col2Vals[i];
            tr.appendChild(col1);
            tr.appendChild(col2)
            tbody.appendChild(tr);
        }
    }
    showSortedData() {
        let table = this.el.querySelector("table.data-table.center-table");
        this._sortTable(table)
    }
}

