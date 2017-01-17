var roleHarvester = {
   
    /** @param {Creep} creep **/
    run: function(creep) {
    //creep.memory.harvesting = true;
	if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
        creep.memory.harvesting = false;
        creep.say('H returning');
	}	  
	
	if(!creep.memory.harvesting && creep.carry.energy == 0) {
        creep.memory.harvesting = true;
        creep.say('H harvesting');
        creep.memory.i = Game.time%4;
	}
	
	if(creep.memory.harvesting == true){
	            
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

	if(!creep.memory.harvesting){
		//creep.say('returning');
		var targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
			    return (structure.structureType == STRUCTURE_EXTENSION ||
				    structure.structureType == STRUCTURE_SPAWN ||
				    structure.structureType == STRUCTURE_CONTAINER ||
				    structure.structureType == STRUCTURE_STORAGE ||
				    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
			}
		});
		if(targets.length > 0) {
		    creep.say('H:t');
		    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		    	creep.moveTo(targets[0]);
		    }
		}
		if(targets == 0){
		    creep.say('H:b');
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                } 
            } 
		}
	}
}
}

module.exports = roleHarvester;