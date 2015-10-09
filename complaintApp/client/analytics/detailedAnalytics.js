if (Meteor.isClient) {
    Template.detailedAnalytics.onRendered(function(){
        var chart1 = c3.generate({
            bindto: '#analytics-space',
            data: {
              columns: [
                ['Total Number of Complaints', 30, 200, 100, 400, 150, 250]
              ],
              type: 'bar'
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            padding: {
                top: 40,
                right: 40,
                left: 40,
            },
        });
    });
}
