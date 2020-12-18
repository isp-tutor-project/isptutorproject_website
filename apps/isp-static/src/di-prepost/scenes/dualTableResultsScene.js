import { DiTestResultsScene } from "./testResultsScene";

export class DiDualTableResultsScene extends DiTestResultsScene {
    constructor(app, sceneInfo) {
        super(app, sceneInfo);
        this.showSortedData = this.showSortedData.bind(this);
    }

    _compareRows(a, b) {
        // compares 2nd column of rows as integers
        let a1 = parseFloat(a.querySelectorAll("td")[1].innerText);
        let b1 = parseFloat(b.querySelectorAll("td")[1].innerText);
        return a1 - b1;
    }

    _sortTable(table) {
        let tbody = table.querySelector("tbody");
        let rows = [...tbody.rows];
        tbody.innerHTML = "";
        rows.sort(this._compareRows);
        for (let row of rows) {
            tbody.appendChild(row);
        }
    }

    showSortedData() {
        let leftTable = this.el.querySelector("table.data-table.left-table");
        let rightTable = this.el.querySelector("table.data-table.right-table");
        this._sortTable(leftTable);
        this._sortTable(rightTable);
    }


}
