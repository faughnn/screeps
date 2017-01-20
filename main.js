var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var towers = require('tower');

var logging = true;

towers.run();
//var spawnCreeps = require('spawner');

var numberOfHarvesters = 4;
var numberOfBuilders = 2;
var numberOfUpgraders = 2;



module.exports.loop = function () {

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(logging && Game.time%10 == 0){
        console.log('H|B|U: ' + harvesters.length +'|' + builders.length + '|'+ upgraders.length);
    }
//    ################ CREEP SPAWINING LOGIC ################
    console.log(Game.gcl.level);
//    if(Game.gcl.level == 2 || Game.gcl == 2 || Game.gcl == 3){
    if(harvesters.length < numberOfHarvesters) {
        var newName = Game.spawns['Home'].createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(builders.length < numberOfBuilders  && harvesters.length == numberOfHarvesters) {
        var newName = Game.spawns['Home'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], undefined, {role: 'builder', building: 'true'});
        console.log('Spawning new builder: ' + newName);
    }
    if(upgraders.length < numberOfUpgraders && harvesters.length == numberOfHarvesters) {
        var newName = Game.spawns['Home'].createCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
//    }

    if(harvesters.length < 3){
        if(harvesters.length < numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        if(builders.length < numberOfBuilders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder', building: 'true'});
            console.log('Spawning new builder: ' + newName);
        }
        if(upgraders.length < numberOfUpgraders  && harvesters.length == numberOfHarvesters) {
            var newName = Game.spawns['Home'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
    }

//    ################ TOWER LOGIC ################
    // var tower = Game.getObjectById('587f533a6638261454303173');
    // if(tower) {
    //     var priority;
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < (structure.hitsMax )
    //     });
    //     console.log('here');
    //     if(closestDamagedStructure) {
    //         console.log('here2');
    //         tower.repair(closestDamagedStructure);
    //         priority = true;
    //         if(logging && Game.time%10 == 0){
    //             console.log('Tower repairing HIGH priority target');
    //         }
    //     }

    //     if(priority = false){
    //         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //             filter: (structure) => structure.hits < structure.hitsMax
    //         });
    //         if(closestDamagedStructure) {
    //             tower.repair(closestDamagedStructure);
    //             if(logging && Game.time%10 == 0){
    //                 console.log('Tower repairing LOW priority target');
    //             }
    //         }
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

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