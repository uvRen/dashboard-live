import _ from "lodash"

class TopErrorData {
	constructor(result) {
		this.errors = [];
		this.number = [];
		this.cause = [];
		
		// Move from object to array
		var sortable = [];
		for (var r in result) {
			sortable.push([r, result[r]]);
		}
		// Sort DESC
		sortable.sort(function(a, b) {
			return b[1].Error - a[1].Error;
		})
		
		// Determine length
		var size = Object.keys(result).length - 1;
		if(size > 4)
			size = 4;
		
		// Return max 5 errors
		for(var i=size; i >= 0; i--) {
			this.errors.push(sortable[i][0]);
			this.number.push(sortable[i][1].Error);
		}

		// Substring ErrorMessage ex. java.lang.Exception: here is why exception
		// We only want java.lang.Exception
		for(var i=0; i <= size; i++) {
			var complete = this.errors[i];
			var pos = complete.indexOf(':');
			if(pos == -1)
				pos = complete.length;
			var strip = complete.substring(0, pos);
			var cause = complete.substring(pos + 1);
			if(cause == "")
				cause = "[No message]";
			this.cause.push(complete.substring(pos + 1));
			this.errors[i] = strip;
		}
	}
}

export { TopErrorData as default }
