/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
    BaseContract,
    BigNumber,
    BigNumberish,
    BytesLike,
    CallOverrides,
    ContractTransaction,
    Overrides,
    PayableOverrides,
    PopulatedTransaction,
    Signer,
    utils,
  } from "ethers";
  import type {
    FunctionFragment,
    Result,
    EventFragment,
  } from "@ethersproject/abi";
  import type { Listener, Provider } from "@ethersproject/providers";
  import type {
    TypedEventFilter,
    TypedEvent,
    TypedListener,
    OnEvent,
    PromiseOrValue,
  } from "../common";
  
  export declare namespace Donate {
    export type OrganizationDataStruct = {
      sender: PromiseOrValue<string>;
      fullAmmount: PromiseOrValue<BigNumberish>;
      netAmmount: PromiseOrValue<BigNumberish>;
      projectId: PromiseOrValue<BigNumberish>;
    };
  
    export type OrganizationDataStructOutput = [
      string,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      sender: string;
      fullAmmount: BigNumber;
      netAmmount: BigNumber;
      projectId: BigNumber;
    };
  
    export type IndividualDataStruct = {
      ammount: PromiseOrValue<BigNumberish>;
      projectId: PromiseOrValue<BigNumberish>;
    };
  
    export type IndividualDataStructOutput = [BigNumber, BigNumber] & {
      ammount: BigNumber;
      projectId: BigNumber;
    };
  }
  
  export interface DonateInterface extends utils.Interface {
    functions: {
      "changeFee(uint256)": FunctionFragment;
      "donate(int256,address)": FunctionFragment;
      "getFee()": FunctionFragment;
      "getRecievedDonations(address)": FunctionFragment;
      "getSentDonations(address)": FunctionFragment;
      "owner()": FunctionFragment;
      "renounceOwnership()": FunctionFragment;
      "transferOwnership(address)": FunctionFragment;
    };
  
    getFunction(
      nameOrSignatureOrTopic:
        | "changeFee"
        | "donate"
        | "getFee"
        | "getRecievedDonations"
        | "getSentDonations"
        | "owner"
        | "renounceOwnership"
        | "transferOwnership"
    ): FunctionFragment;
  
    encodeFunctionData(
      functionFragment: "changeFee",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "donate",
      values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
    ): string;
    encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
    encodeFunctionData(
      functionFragment: "getRecievedDonations",
      values: [PromiseOrValue<string>]
    ): string;
    encodeFunctionData(
      functionFragment: "getSentDonations",
      values: [PromiseOrValue<string>]
    ): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(
      functionFragment: "renounceOwnership",
      values?: undefined
    ): string;
    encodeFunctionData(
      functionFragment: "transferOwnership",
      values: [PromiseOrValue<string>]
    ): string;
  
    decodeFunctionResult(functionFragment: "changeFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "donate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
    decodeFunctionResult(
      functionFragment: "getRecievedDonations",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "getSentDonations",
      data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(
      functionFragment: "renounceOwnership",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "transferOwnership",
      data: BytesLike
    ): Result;
  
    events: {
      "OwnershipTransferred(address,address)": EventFragment;
    };
  
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  }
  
  export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
  }
  export type OwnershipTransferredEvent = TypedEvent<
    [string, string],
    OwnershipTransferredEventObject
  >;
  
  export type OwnershipTransferredEventFilter =
    TypedEventFilter<OwnershipTransferredEvent>;
  
  export interface Donate extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
  
    interface: DonateInterface;
  
    queryFilter<TEvent extends TypedEvent>(
      event: TypedEventFilter<TEvent>,
      fromBlockOrBlockhash?: string | number | undefined,
      toBlock?: string | number | undefined
    ): Promise<Array<TEvent>>;
  
    listeners<TEvent extends TypedEvent>(
      eventFilter?: TypedEventFilter<TEvent>
    ): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(
      eventFilter: TypedEventFilter<TEvent>
    ): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
  
    functions: {
      changeFee(
        newFee: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      donate(
        _projectId: PromiseOrValue<BigNumberish>,
        _targetAddress: PromiseOrValue<string>,
        overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      getFee(overrides?: CallOverrides): Promise<[BigNumber]>;
  
      getRecievedDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<[Donate.OrganizationDataStructOutput[]]>;
  
      getSentDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<[Donate.IndividualDataStructOutput[]]>;
  
      owner(overrides?: CallOverrides): Promise<[string]>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
    };
  
    changeFee(
      newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    donate(
      _projectId: PromiseOrValue<BigNumberish>,
      _targetAddress: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    getFee(overrides?: CallOverrides): Promise<BigNumber>;
  
    getRecievedDonations(
      _targetAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<Donate.OrganizationDataStructOutput[]>;
  
    getSentDonations(
      _targetAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<Donate.IndividualDataStructOutput[]>;
  
    owner(overrides?: CallOverrides): Promise<string>;
  
    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    callStatic: {
      changeFee(
        newFee: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      donate(
        _projectId: PromiseOrValue<BigNumberish>,
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      getFee(overrides?: CallOverrides): Promise<BigNumber>;
  
      getRecievedDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<Donate.OrganizationDataStructOutput[]>;
  
      getSentDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<Donate.IndividualDataStructOutput[]>;
  
      owner(overrides?: CallOverrides): Promise<string>;
  
      renounceOwnership(overrides?: CallOverrides): Promise<void>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<void>;
    };
  
    filters: {
      "OwnershipTransferred(address,address)"(
        previousOwner?: PromiseOrValue<string> | null,
        newOwner?: PromiseOrValue<string> | null
      ): OwnershipTransferredEventFilter;
      OwnershipTransferred(
        previousOwner?: PromiseOrValue<string> | null,
        newOwner?: PromiseOrValue<string> | null
      ): OwnershipTransferredEventFilter;
    };
  
    estimateGas: {
      changeFee(
        newFee: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      donate(
        _projectId: PromiseOrValue<BigNumberish>,
        _targetAddress: PromiseOrValue<string>,
        overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      getFee(overrides?: CallOverrides): Promise<BigNumber>;
  
      getRecievedDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<BigNumber>;
  
      getSentDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<BigNumber>;
  
      owner(overrides?: CallOverrides): Promise<BigNumber>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
    };
  
    populateTransaction: {
      changeFee(
        newFee: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      donate(
        _projectId: PromiseOrValue<BigNumberish>,
        _targetAddress: PromiseOrValue<string>,
        overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      getFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      getRecievedDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<PopulatedTransaction>;
  
      getSentDonations(
        _targetAddress: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<PopulatedTransaction>;
  
      owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
    };
  }
  