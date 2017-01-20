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
        if(creep.memory.init){
            creep.memory.i = Game.time%4;
            creep.say('Mining@' +creep.memory.i);
            creep.memory.init = false;
        }

        if(!creep.memory.miner && creep.carry.energy == 0) {
            creep.memory.returnToContainer = false;
            creep.memory.miner = true;
            creep.say('M:m');
        }
        
        if((creep.memory.miner == true) && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.returnToContainer = true;
            creep.memory.miner = false;
            creep.say('M:rtc');
        }

        if(creep.memory.miner) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.memory.i > 2){
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[creep.memory.i]);
                    creep.moveTo(sources[1]);
                    creep.say('M:@' +creep.memory.i);
                }
            } else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[creep.memory.i]);
                    creep.moveTo(sources[0]);
                    creep.say('M:@' +creep.memory.i);
                }
            }
        }

        if(creep.memory.returnToContainer){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                creep.say('H:t');
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleBuilder;