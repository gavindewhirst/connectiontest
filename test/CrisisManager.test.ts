import { assert } from "chai";
import { CrisisManager } from "../src/CrisisManager"

describe("Flag ON", () => {
    test("5 SLOW LINK, 1 SECOND : Testing for flag", () => {
        let slowlink_list:number[] = [] ;
        let test_time:number = new Date().getTime();
        slowlink_list = [ 
            // test_time, - the initial entry in the list comes from the register_slowlink call made in the assert
            test_time - 500,
            test_time - 500,
            test_time - 500,
            test_time - 500 
        ]
        let cm = new CrisisManager(1, 5);
        cm.slowlink_list = slowlink_list;
        assert(cm.register_slowlink() == true);
    });
});

describe("Only keeps the necessary buffer", () => {
    test("10 slow_links in the list. 5 are out of window. 5 should be left.", () => {

        let slowlink_list:number[] = [] ;
        let test_time:number = new Date().getTime();
        slowlink_list = [ 
            // test_time, - the initial entry in the list comes from the register_slowlink call made in the asser
            test_time - 500,
            test_time - 500,
            test_time - 500,
            test_time - 500,
            test_time - 5000,
            test_time - 5000,
            test_time - 5000,
            test_time - 5000,
            test_time - 5000 
        ]
        let cm = new CrisisManager(2, 100);
        cm.slowlink_list = slowlink_list;
        cm.register_slowlink();
        assert(cm.slowlink_list.length == 5);
    });
});

