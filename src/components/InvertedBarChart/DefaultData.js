import _ from "lodash"

class DefaultData {
	constructor(result) {
		this.errors = [];
		this.number = [];

		var sortable = [];
		for (var r in result) {
			sortable.push([r, result[r]]);
		}

		sortable.sort(function(a, b) {
			return b[1].Error - a[1].Error;
		})

		var size = Object.keys(result).length - 1;
		if(size > 4)
			size = 4;

		for(var i=size; i >= 0; i--) {
			this.errors.push(sortable[i][0]);
			this.number.push(sortable[i][1].Error);
		}
	}
}

export { DefaultData as default }
