/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {



    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.memory.building = true;
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.harvest = true;
            creep.say('B:harvest');
            creep.memory.i = Game.time%4;
            creep.say(creep.memory.i);
        }

        if((creep.memory.building == false) && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.harvest = false;
            creep.say('B:build');
        }
        /*
         if(creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
         creep.say('B:repair');
         var roadToRepair = creep.room.find(FIND_STRUCTURES, {
         filter: function(object){
         return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
         }
         });

         if (roadToRepair){
         creep.moveTo(roadToRepair);
         creep.repair(roadToRepair);
         } else{
         creep.memory.repair = false;
         creep.memory.building = true;
         }
         }
         */
//     if(creep.memory.repair) {
//          creep.say('B:repair');
//         var roadToRepair = creep.room.find(FIND_STRUCTURES, {
//     	    filter: function(object){
//     	    return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
//     		}
// 	    });

// 	    if (roadToRepair){
//     		creep.moveTo(roadToRepair);
//     		creep.repair(roadToRepair);
// 	    }
// 	    if (creep.carry.energy == 0){
// 	        creep.memory.repair = false;
// 	    }
// 	}


        if(creep.memory.building) {
            //creep.say('B:build');
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.memory.role = 'upgrader';
            }
            creep.say('B'+targets.length);
        }



        if(creep.memory.harvest){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.memory.i > 2){
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[creep.memory.i]);
                    creep.moveTo(sources[1]);
                    creep.say('H:' +creep.memory.i);
                }
            } else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[creep.memory.i]);
                    creep.moveTo(sources[0]);
                    creep.say('H:' +creep.memory.i);
                }
            }
        }
    }
};

module.exports = roleBuilder;