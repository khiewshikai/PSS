Template.terminateManager.rendered = function(){
    setTimeout(function(){
        var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();  
        listOfManager.forEach(function(mgr) {
            $('.managerToTerminate').append('<option>'+mgr.username+'</option>');
         })
  },300)   
}

Template.terminateManager.events({
    'change .managerToTerminate': function(e, template){
        //reset
        template.$('.tableBody').empty();
        //get value
        var currentManager = template.$('.managerToTerminate').val();
        console.log(currentManager);
        //if ---select manager--- is select
        if(currentManager === '---Select a manager---'){
            if(!template.$('.info-noTask').hasClass('hide')){
                template.$('.info-noTask').addClass('hide');
            }
            if(!template.$('#taskTable').hasClass('hide')){
                template.$('#taskTable').addClass('hide');
            }
            if(!template.$('.confirmBtn').hasClass('hide')){
                template.$('.confirmBtn').addClass('hide');
            }
            console.log("select endter")
            return; //early termination of method
        }

        var currentManagerID = Meteor.users.findOne({username: currentManager })._id
        var taskList = tasksCollection.find({managerID: currentManagerID}).fetch()
        console.log(taskList.length);

        if(taskList.length <= 0){
            template.$('.info-noTask').removeClass('hide');
            template.$('#taskTable').addClass('hide');
            template.$('.confirmBtn').removeClass('hide')
        }else{
            template.$('.info-noTask').addClass('hide');
            taskList.forEach(function(task){
                template.$('.tableBody').append('<tr><td class="tempCaseID">'+task.complaintID+'</td><td><select class="tempSel"></select></td></tr>')
            })
            var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();  
            listOfManager.forEach(function(mgr) {
                if(mgr.username === currentManager){

                }else{
                    $('.tempSel').append('<option>'+mgr.username+'</option>');
                }
                
             })
            template.$('#taskTable').removeClass('hide')
            template.$('.confirmBtn').removeClass('hide')
        }
        
    },

    'click .cd-updateBtn': function(e,template){
        var currentManager = template.$('.managerToTerminate').val();
        var currentManagerID = Meteor.users.findOne({username: currentManager })._id
        console.log("test")
        if(!template.$('#taskTable').hasClass('hide')){
            //reallocate tasks
            console.log("enter loop")

            template.$('.tableBody tr').each(function(){
                var caseID = parseInt($(this).find('.tempCaseID').text());
                var newManager = $(this).find(".tempSel").val();
                 console.log(caseID)
                 console.log(newManager)
                var managerID = Meteor.users.findOne({username: newManager })._id;
                var taskMongoID = tasksCollection.findOne({complaintID: caseID})._id;
                
                tasksCollection.update(
                    {_id: taskMongoID },
                    {$set: {managerID: managerID, isViewed: false}} //needs to update worklist of manager
                );
                Meteor.call('logger',
                    Meteor.user()._id,
                    'terminate',
                    'Change of task manager for caseID: ' + caseID + ' to manager with ID: ' + newManager + '. Old manager: ' + currentManagerID);
            })
        }

        // log
            Meteor.call('logger',
                Meteor.user()._id,
                'terminate',
                'Terminated mananger id ' + currentManagerID);


        //termnate the manager
        Meteor.users.remove(currentManagerID)
        console.log("User: " + currentManagerID + " Name: " + currentManager + " removed.")
        toastr.info("Manager deleted");
        Router.go("/dashboard")
    }
})

