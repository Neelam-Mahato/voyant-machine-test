const si = require('systeminformation');

function MakegetSystemDetails() {
    return async function getSystemDetails() { 

        // hard disk and available drives 
        let hard_disk = await si.diskLayout(); 
        for(var j=0; j<hard_disk.length; j++){
            if(hard_disk[j].type=='HD'){
                hard_disk.size = hard_disk[j].size;
            }
        }

        let available_drives =  await si.fsSize(); 
        let c =0;
        for(var i=0; i<available_drives.length; i++){
            c += available_drives[i].used;
            available_drives[i] = {
                'Drive':available_drives[i].fs,
                'Total Space': readableBytes(available_drives[i].size),
                'Used Space': readableBytes(available_drives[i].used) + ' '+ available_drives[i].use +' %',
                'Free Space':readableBytes(available_drives[i].available) + ' '+ (100-available_drives[i].use) +' %',
            }
         }

        hard_disk = {
            'Total Space': readableBytes(hard_disk.size),
            'Used Space': readableBytes(c)  + ' '+ ((c/hard_disk.size)*100).toFixed(2) +' %',
            'Free Space': readableBytes(hard_disk.size - c)  + ' '+ (((hard_disk.size - c) /hard_disk.size)*100).toFixed(2) +' %'
        };

        // memory 
        let memory =  await si.mem(); 
         memory = {
            'Total Space': readableBytes(memory.total),
            'Used Space': readableBytes(memory.used) + ' '+ ((memory.used/memory.total)*100).toFixed(2) +' %',
            'Free Space':readableBytes(memory.free) + ' '+ ((memory.free/memory.total)*100).toFixed(2) +' %',
        }

       //services
        let services = await si.processes(); 
        for(var k=0; k<services.list.length; k++){
            services.list[k] = {
                'Service': services.list[k].name,
                'PIDS': services.list[k].pid 
            }      
        }      
     
        let system_monitoring ={
            'Hard Disk': hard_disk,
            'Available Drive Details': available_drives,
            'Memory': memory,
            'Services': services.list,
            'Timestamp': (Date.parse(new Date())/1000)
        }
            
         return system_monitoring;
    }   
    
    function readableBytes(bytes) {
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        return (bytes / Math.pow(1024, 2)).toFixed(2) * 1 + ' ' + sizes[2];
        }
}

module.exports=MakegetSystemDetails