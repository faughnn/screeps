/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    if(Game.gcl = 1){  
        if(harvesters.length < numberOfHarvesters) {
        var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
        }
        
        if(builders.length < numberOfBuilders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
    
        if(builders.length < numberOfUpgraders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
    }
    
    if(Game.gcl = 1){
        
        if(harvesters.length < numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
            
        if(builders.length < numberOfBuilders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
            
        if(upgraders.length < numberOfUpgraders && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
        
    }
};

module.exports = spawnCreeps;