var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
//var spawnCreeps = require('spawner');

var numberOfHarvesters = 4;
var numberOfBuilders = 1;
var numberOfUpgraders = 3;

module.exports.loop = function () {
    
    for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }   
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    console.log('H|B|U: ' + harvesters.length +'|' + builders.length + '|'+ upgraders.length);
    
    if(Game.gcl = 1){
        
        if(harvesters.length < numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        if(builders.length < numberOfBuilders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder', building: 'true'});
            console.log('Spawning new builder: ' + newName);
        }
        if(upgraders.length < numberOfUpgraders && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
    }
    
    if(Game.gcl = 1 || harvesters.length == 3){  
        if(harvesters.length < numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        if(builders.length < numberOfBuilders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder', building: 'true'});
            console.log('Spawning new builder: ' + newName);
        }
        if(upgraders.length < numberOfUpgraders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
    }

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            
        }
    }
}