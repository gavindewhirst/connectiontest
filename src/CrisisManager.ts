import { EventEmitter } from "node:stream";

export class CrisisManager  {

    public slowlink_list: number[] = []; // public for testing. better way?
    get IsCrisis():boolean { return this._isCrisis; };

    private flag_after_counts: number = 5;
    private sample_seconds:number = 5 ;         
    private _isCrisis:boolean = false;

    constructor(sample_seconds: number, flag_after_counts:number) { 
        this.sample_seconds = sample_seconds;
        this.flag_after_counts = flag_after_counts;
    }

    public register_slowlink(): boolean {
        this.slowlink_list.unshift(new Date().getTime());
        return this.process_slowlinks();
      }

    private process_slowlinks(): boolean{ 

        // get the constraint
        let sample_seconds_ago:number = new Date().getTime() - (this.sample_seconds * 1000);

       // get the count over the sample. drop anything that's too old
       let pollCount:number = 0;
       for (var i=0;i<this.slowlink_list.length;i++) {
            if(this.slowlink_list[i]  >= sample_seconds_ago) {
                pollCount++;
            }
            else{
                this.slowlink_list.splice(i);
                break;
            }
       }
    
       // update the flag if needed  
       if(pollCount >= this.flag_after_counts) {           
            this._isCrisis = true;
            // TODO : emit any change for listeners
        }
        else{
            this._isCrisis = false;
            // TODO : emit any change for listeners
        }

        // TODO : an instuction to re-process after 1.5 x sample time (i.e. sample time = 10s, retry after 15s)
       return this._isCrisis

    }
}