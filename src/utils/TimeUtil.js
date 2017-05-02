class TimeUtil {
    static toMinutesAndSeconds(seconds) {
        let minutes = Math.floor(seconds / 60);
        let elapsedSeconds = Math.floor(seconds % 60);
        return minutes + ' m ' + elapsedSeconds + ' s';
    }

    static toLocaleDateString(date) {
        return new Date(date).toLocaleDateString()
    }

    static toTime(date) {
        var tmpDate = new Date(date);
        return (tmpDate.getHours()<10?'0':'') + tmpDate.getHours() + ":" + (tmpDate.getMinutes()<10?'0':'') + tmpDate.getMinutes();
    }

}

export { TimeUtil as default}