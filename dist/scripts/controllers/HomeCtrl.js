/* scripts/controllers/HomeCtrl.js */

(function() {
    
    'use strict';

    function HomeCtrl($scope, $filter, $firebaseArray, Timekeeper, Course) {
        var vm = this;
        
        $scope.timekeepers = Timekeeper.all;
        
        $scope.selected = {
            timekeeper: $scope.timekeepers[0],
        };
        
        $scope.changeTimekeeper = function changeTimekeeper(timekeeper) {
            $scope.selected.timekeeper = timekeeper;
            $scope.listCourses = Timekeeper.getCourses(timekeeper.$id);
        };        
        
        $scope.deleteTimekeeper = function(timekeeper) {
            Timekeeper.delete(timekeeper).then(function(data){
                console.log('Timekeeper deleted!');
            })
        };
        
        $scope.addCourse = function(){
            Course.send({
                timekeeperId: $scope.selected.timekeeper.$id,
                course: vm.course,
//                provider: vm.provider,
//                category: vm.category,
                date: vm.dateIn,
                hours: vm.clockIn,
                enteredAt: Date(Firebase.ServerValue.TIMESTAMP*1000)
            }).then(function(data){
                vm.course = '';
                vm.dateIn = '';
                vm.clockIn = '';
                console.log('entry created!');
            })
        };   
        

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'mm/dd/yyyy',
            hiddenName: true,
            onSet: function(ele) {
                vm.dateIn = $('.datepicker').pickadate().val().toString();
                if(ele.select){
                    this.close();
                }
            }
        });

        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
        );
        
        $(document).ready(function() {
            $('select').material_select();
        });

    }

    angular
        .module('mcleTrackr')
        .controller('HomeCtrl', ['$scope', '$filter', '$firebaseArray', 'Timekeeper', 'Course', HomeCtrl]);

})();