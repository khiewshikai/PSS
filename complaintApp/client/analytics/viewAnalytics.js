if (Meteor.isClient) {
	Template.viewAnalytics.onRendered(function(){

        $(".ui-sortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".ui-sortable",
            forcePlaceholderSize: true,
            zIndex: 999999
        }).disableSelection();

        var chart1 = c3.generate({
            bindto: '#complaints',
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
            }
        });

        var chart2 = c3.generate({
            bindto: '#complaints-per-cat',
            data: {
              columns: [
                ['Total Number of Complaints Per Category', 50, 150, 80, 200, 140, 40]
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
            }
        });

        var chart3 = c3.generate({
            bindto: '#compliments',
            data: {
              columns: [
                ['Total Number of Compliments', 50, 150, 80, 200, 140, 40]
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
            }
        });

        var chart4 = c3.generate({
            bindto: '#avg-complaint-time',
            data: {
              columns: [
                ['Average Time Taken Per Case', 50, 150, 80, 200, 140, 40]
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
            }
        });
        
	});	
}