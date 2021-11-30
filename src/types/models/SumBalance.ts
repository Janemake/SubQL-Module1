// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class SumBalance implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountTotal: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SumBalance entity without an ID");
        await store.set('SumBalance', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SumBalance entity without an ID");
        await store.remove('SumBalance', id.toString());
    }

    static async get(id:string): Promise<SumBalance | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SumBalance entity without an ID");
        const record = await store.get('SumBalance', id.toString());
        if (record){
            return SumBalance.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<SumBalance, FunctionPropertyNames<SumBalance>>> & Entity): SumBalance {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new SumBalance(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
