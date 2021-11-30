import {SubstrateEvent} from "@subql/types";
import {Account, SumBalance} from "../types";
import {Balance} from "@polkadot/types/interfaces";

function createSumBalance(accountId: string): SumBalance {
    const entity = new SumBalance(accountId);
    entity.accountTotal = BigInt(0);
    return entity;
}


export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
     //Create a new Account entity with ID using block hash
    let record = new Account(event.extrinsic.block.block.header.hash.toString());
    // Assign the Polkadot address to the account field
    record.account = account.toString();

    // Look for the address in the total database
    let entity = await SumBalance.get(record.account);

    // Assign the balance to the balance field "type cast as Balance"
    record.balance = (balance as Balance).toBigInt();

    await record.save();
    //logger.info("address: " + record.account + "  ==> Balance: " + record.balance);

    // COMPUTE THE TOTAL Balance
    if (entity === undefined){
        entity = createSumBalance(account.toString());
    }
    entity.accountTotal += record.balance;
    await entity.save();
    logger.info("Address: " + entity.id + " with a new balance of :" + record.balance +  " and a Total balance Balance: " + entity.accountTotal);

}

