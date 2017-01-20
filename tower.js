/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function() {
        var tower = Game.getObjectById('587f533a6638261454303173');
        if(tower) {
            var priority;
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < (structure.hitsMax )
        });
            console.log('here');
            if(closestDamagedStructure) {
                console.log('here2');
                tower.repair(closestDamagedStructure);
                priority = true;
                if(logging && Game.time%10 == 0){
                    console.log('Tower repairing HIGH priority target');
                }
            }

            if(priority = false){
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
            });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                    if(logging && Game.time%10 == 0){
                        console.log('Tower repairing LOW priority target');
                    }
                }
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }

};