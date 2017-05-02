import _ from "lodash"

class FreezeData {
    constructor(aggregationResult) {
        var self = this;
        this.serverData = [];
        this.date = [];
        this.userCount = [];
        this.freezeTimes = [];
        this.servers = Object.keys(aggregationResult);
        _.forEach(aggregationResult, function (value, key) {
            var server = key;
            _.forEach(value, function (value, key) {
                self.serverData.push(server);
                self.date.push(key);
                self.userCount.push(value.Users);
                self.freezeTimes.push(value.FreezeTime);
            })
        })
    }

    uniqueDate() {
        return _.uniq(this.date).sort(function (a, b) {
            var c = new Date(a);
            var d = new Date(b);
            return c - d;
        });
    }

    transform() {
        var uniqueDate = _.uniq(this.date);
        var dateData = [];
        _.forEach(this.date, function (key) {
            dateData.push(uniqueDate.indexOf(key));
        })

        return _.zip(this.date, this.serverIndex(), this.userCount, this.freezeTimes);
    }

    serverIndex() {
        var result = []
        var uniqueServer = _.uniq(this.serverData);
        _.forEach(this.serverData, function (key) {
            result.push(uniqueServer.indexOf(key));
        });
        return result;
    }
}

export { FreezeData as default }
