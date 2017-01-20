/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.memory.role = 'harvester';
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            creep.say('U:u');
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {

            var stores = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_CONTAINER
                ) && (structure.store[RESOURCE_ENERGY] > 0);
        }
        });
            //console.log('Spawning new builder: ' + stores);
            if(creep.withdraw(stores[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(stores[0]);
                creep.say('U:w');
            }

            if(stores.length == 0){
                creep.say('U:h');
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
    }
};

module.exports = roleUpgrader;