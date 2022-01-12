import { BigInt } from "@graphprotocol/graph-ts"
import {
  GunPreOrder,
  GunsBought,
  OwnershipTransferred,
  Withdrawal,
  consumerBulkBuy
} from "../generated/GunPreOrder/GunPreOrder"
import { Purchase } from "../generated/schema"

export function handleGunsBought(event: GunsBought): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let purchase = Purchase.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!purchase) {
    purchase = new Purchase(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    purchase.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  purchase.count = purchase.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  purchase.gunId = event.params.gunId
  purchase.owner = event.params.owner

  // Entities can be written to the store with `.save()`
  purchase.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.COMMISSION_PERCENT(...)
  // - contract.allowCreateCategory(...)
  // - contract.allowEthPayment(...)
  // - contract.bznFeed(...)
  // - contract.categoryExists(...)
  // - contract.categoryKilled(...)
  // - contract.categoryOpen(...)
  // - contract.categoryPercentBase(...)
  // - contract.categoryPercentIncrease(...)
  // - contract.categoryPrice(...)
  // - contract.categoryReserveAmount(...)
  // - contract.convert(...)
  // - contract.ethFeed(...)
  // - contract.isOwner(...)
  // - contract.owner(...)
  // - contract.priceFor(...)
  // - contract.requiredEtherPercent(...)
  // - contract.requiredEtherPercentBase(...)
  // - contract.sold(...)
  // - contract.token(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleWithdrawal(event: Withdrawal): void {}

export function handleconsumerBulkBuy(event: consumerBulkBuy): void {}
