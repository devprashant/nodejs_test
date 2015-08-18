module.exports = function() {
    var ratePoints = 0;
    return {
        rate: function(points) {
            ratePoints = points;
        },
        getPoints: function(){
            return ratePoints;
        }
    }
}