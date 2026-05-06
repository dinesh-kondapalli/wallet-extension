/**
 *  An ordered collection of [[AccessList]] entries.
 */
declare type AccessList = Array<AccessListEntry>;

/**
 *  A single [[AccessList]] entry of storage keys (slots) for an address.
 */
declare type AccessListEntry = {
    address: string;
    storageKeys: Array<string>;
};

/**
 *  Any ethers-supported access list structure.
 */
declare type AccessListish = AccessList | Array<[string, Array<string>]> | Record<string, Array<string>>;

declare interface Authorization {
    address: string;
    nonce: bigint;
    chainId: bigint;
    signature: Signature;
}

/**
 *  Any type that can be used where a big number is needed.
 */
declare type BigNumberish = string | Numeric;

/**
 *  A BLOb object that can be passed for [[link-eip-4844]]
 *  transactions.
 *
 *  It may have had its commitment and proof already provided
 *  or rely on an attached [[KzgLibrary]] to compute them.
 */
declare type BlobLike = BytesLike | {
    data: BytesLike;
    proof: BytesLike;
    commitment: BytesLike;
};

/**
 *  An object that can be used to represent binary data.
 */
declare type BytesLike = DataHexString | Uint8Array;

export declare function checkDevice({ transportIdentifier, deviceId, }: {
    transportIdentifier: TransportIdentifier;
    deviceId?: string;
}): Promise<{
    sessionId: string;
    device: DiscoveredDevice;
}>;

export declare function connectDevice({ transportIdentifier, }: {
    transportIdentifier: TransportIdentifier;
}): Promise<{
    sessionId: string;
    device: DiscoveredDevice;
}>;

/**
 *  A [[HexString]] whose length is even, which ensures it is a valid
 *  representation of binary data.
 */
declare type DataHexString = string;

export declare function deniedByUser(error: LedgerError): boolean;

declare type DiscoveredDevice = {
    readonly id: string;
    readonly name: string;
    readonly transport: string;
    readonly rssi?: number | null;
};

export declare function getAddressesEth({ type, from, count }: {
    type: PathType;
    from?: number;
    count: number;
}, { sessionId, onInteractionRequested, onProgress, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
    onProgress?: (progress: number) => void;
}): Promise<{
    derivationPath: string;
    account: {
        address: string;
    };
}[]>;

export declare function getAddressesSolana({ type, from, count }: {
    type: PathType;
    from?: number;
    count: number;
}, { sessionId, onInteractionRequested, onProgress, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
    onProgress?: (progress: number) => void;
}): Promise<{
    derivationPath: string;
    account: {
        address: string;
    };
}[]>;

export declare function getDeniedByUserError(): LedgerError;

export declare function getHardwareError(error: unknown): LedgerError | null;

export declare function hardwareWalletError(error: unknown): boolean;

declare const inspect: unique symbol;

/**
 *  A KZG Library with the necessary functions to compute
 *  BLOb commitments and proofs.
 */
declare interface KzgLibrary {
    blobToKzgCommitment: (blob: Uint8Array) => Uint8Array;
    computeBlobKzgProof: (blob: Uint8Array, commitment: Uint8Array) => Uint8Array;
}

/**
 *  A KZG Library with any of the various API configurations.
 *  As the library is still experimental and the API is not
 *  stable, depending on the version used the method names and
 *  signatures are still in flux.
 *
 *  This allows any of the versions to be passed into Transaction
 *  while providing a stable external API.
 */
declare type KzgLibraryLike = KzgLibrary | {
    blobToKZGCommitment: (blob: string) => string;
    computeBlobKZGProof: (blob: string, commitment: string) => string;
} | {
    blobToKzgCommitment: (blob: string) => string | Uint8Array;
    computeBlobProof: (blob: string, commitment: string) => string | Uint8Array;
};

export declare class LedgerError extends Error {
    errorCode?: string;
    _tag?: string;
    constructor(params: {
        message: string;
        errorCode?: string;
        _tag?: string;
    });
    toString(): string;
}

/**
 *  Any type that can be used where a numeric value is needed.
 */
declare type Numeric = number | bigint;

export declare function parseLedgerError(error: unknown): LedgerError;

declare const paths: {
    ledger: (index: number) => string;
    ledgerLive: (index: number) => string;
    bip44: (index: number) => string;
    solanaBip44Change: (index: number) => string;
    solanaBip44: (index: number) => string;
    solanaDeprecated: (index: number) => string;
};

declare type PathType = keyof typeof paths;

export declare function personalSign({ derivationPath, message, }: {
    derivationPath: string;
    message: string;
}, { sessionId, onInteractionRequested, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
}): {
    promise: Promise<string>;
    cancel: () => void;
};

/**
 *  A Signature  @TODO
 *
 *
 *  @_docloc: api/crypto:Signing
 */
declare class Signature {
    #private;
    /**
     *  The ``r`` value for a signature.
     *
     *  This represents the ``x`` coordinate of a "reference" or
     *  challenge point, from which the ``y`` can be computed.
     */
    get r(): string;
    set r(value: BytesLike);
    /**
     *  The ``s`` value for a signature.
     */
    get s(): string;
    set s(_value: BytesLike);
    /**
     *  Return the s value, unchecked for EIP-2 compliance.
     *
     *  This should generally not be used and is for situations where
     *  a non-canonical S value might be relevant, such as Frontier blocks
     *  that were mined prior to EIP-2 or invalid Authorization List
     *  signatures.
     */
    get _s(): string;
    /**
     *  Returns true if the Signature is valid for [[link-eip-2]] signatures.
     */
    isValid(): boolean;
    /**
     *  The ``v`` value for a signature.
     *
     *  Since a given ``x`` value for ``r`` has two possible values for
     *  its correspondin ``y``, the ``v`` indicates which of the two ``y``
     *  values to use.
     *
     *  It is normalized to the values ``27`` or ``28`` for legacy
     *  purposes.
     */
    get v(): 27 | 28;
    set v(value: BigNumberish);
    /**
     *  The EIP-155 ``v`` for legacy transactions. For non-legacy
     *  transactions, this value is ``null``.
     */
    get networkV(): null | bigint;
    /**
     *  The chain ID for EIP-155 legacy transactions. For non-legacy
     *  transactions, this value is ``null``.
     */
    get legacyChainId(): null | bigint;
    /**
     *  The ``yParity`` for the signature.
     *
     *  See ``v`` for more details on how this value is used.
     */
    get yParity(): 0 | 1;
    /**
     *  The [[link-eip-2098]] compact representation of the ``yParity``
     *  and ``s`` compacted into a single ``bytes32``.
     */
    get yParityAndS(): string;
    /**
     *  The [[link-eip-2098]] compact representation.
     */
    get compactSerialized(): string;
    /**
     *  The serialized representation.
     */
    get serialized(): string;
    /**
     *  @private
     */
    constructor(guard: any, r: string, s: string, v: 27 | 28);
    /**
     *  Returns the canonical signature.
     *
     *  This is only necessary when dealing with legacy transaction which
     *  did not enforce canonical S values (i.e. [[link-eip-2]]. Most
     *  developers should never require this.
     */
    getCanonical(): Signature;
    /**
     *  Returns a new identical [[Signature]].
     */
    clone(): Signature;
    /**
     *  Returns a representation that is compatible with ``JSON.stringify``.
     */
    toJSON(): any;
    [inspect](): string;
    toString(): string;
    /**
     *  Compute the chain ID from the ``v`` in a legacy EIP-155 transactions.
     *
     *  @example:
     *    Signature.getChainId(45)
     *    //_result:
     *
     *    Signature.getChainId(46)
     *    //_result:
     */
    static getChainId(v: BigNumberish): bigint;
    /**
     *  Compute the ``v`` for a chain ID for a legacy EIP-155 transactions.
     *
     *  Legacy transactions which use [[link-eip-155]] hijack the ``v``
     *  property to include the chain ID.
     *
     *  @example:
     *    Signature.getChainIdV(5, 27)
     *    //_result:
     *
     *    Signature.getChainIdV(5, 28)
     *    //_result:
     *
     */
    static getChainIdV(chainId: BigNumberish, v: 27 | 28): bigint;
    /**
     *  Compute the normalized legacy transaction ``v`` from a ``yParirty``,
     *  a legacy transaction ``v`` or a legacy [[link-eip-155]] transaction.
     *
     *  @example:
     *    // The values 0 and 1 imply v is actually yParity
     *    Signature.getNormalizedV(0)
     *    //_result:
     *
     *    // Legacy non-EIP-1559 transaction (i.e. 27 or 28)
     *    Signature.getNormalizedV(27)
     *    //_result:
     *
     *    // Legacy EIP-155 transaction (i.e. >= 35)
     *    Signature.getNormalizedV(46)
     *    //_result:
     *
     *    // Invalid values throw
     *    Signature.getNormalizedV(5)
     *    //_error:
     */
    static getNormalizedV(v: BigNumberish): 27 | 28;
    /**
     *  Creates a new [[Signature]].
     *
     *  If no %%sig%% is provided, a new [[Signature]] is created
     *  with default values.
     *
     *  If %%sig%% is a string, it is parsed.
     */
    static from(sig?: SignatureLike): Signature;
}

declare type Signature_2 = Uint8Array;

/**
 *  A SignatureLike
 *
 *  @_docloc: api/crypto:Signing
 */
declare type SignatureLike = Signature | string | {
    r: string;
    s: string;
    v: BigNumberish;
    yParity?: 0 | 1;
    yParityAndS?: string;
} | {
    r: string;
    yParityAndS: string;
    yParity?: 0 | 1;
    s?: string;
    v?: number;
} | {
    r: string;
    s: string;
    yParity: 0 | 1;
    v?: BigNumberish;
    yParityAndS?: string;
};

export declare function signSolanaTransaction({ derivationPath, transaction, }: {
    derivationPath: string;
    transaction: string;
}, { sessionId, onInteractionRequested, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
}): {
    promise: Promise<{
        signature: Signature_2;
    }>;
    cancel: () => void;
};

export declare function signTransaction({ derivationPath, rawTransaction, }: {
    derivationPath: string;
    rawTransaction: TransactionLike;
}, { sessionId, onInteractionRequested, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
}): {
    promise: Promise<{
        serialized: string;
    }>;
    cancel: () => void;
};

export declare function signTypedData_v4({ derivationPath, rawTypedData, }: {
    derivationPath: string;
    rawTypedData: string | TypedData;
}, { sessionId, onInteractionRequested, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
}): {
    promise: Promise<string>;
    cancel: () => void;
};

export declare function solanaSignMessage({ derivationPath, message, }: {
    derivationPath: string;
    message: string;
}, { sessionId, onInteractionRequested, }: {
    sessionId: string;
    onInteractionRequested?: (type: UserInteractionRequested) => void;
}): {
    promise: Promise<string>;
    cancel: () => void;
};

export declare function supportsBluetooth(): boolean;

export declare function supportsLedger(): boolean;

/**
 *  A **TransactionLike** is an object which is appropriate as a loose
 *  input for many operations which will populate missing properties of
 *  a transaction.
 */
declare interface TransactionLike<A = string> {
    /**
     *  The type.
     */
    type?: null | number;
    /**
     *  The recipient address or ``null`` for an ``init`` transaction.
     */
    to?: null | A;
    /**
     *  The sender.
     */
    from?: null | A;
    /**
     *  The nonce.
     */
    nonce?: null | number;
    /**
     *  The maximum amount of gas that can be used.
     */
    gasLimit?: null | BigNumberish;
    /**
     *  The gas price for legacy and berlin transactions.
     */
    gasPrice?: null | BigNumberish;
    /**
     *  The maximum priority fee per gas for london transactions.
     */
    maxPriorityFeePerGas?: null | BigNumberish;
    /**
     *  The maximum total fee per gas for london transactions.
     */
    maxFeePerGas?: null | BigNumberish;
    /**
     *  The data.
     */
    data?: null | string;
    /**
     *  The value (in wei) to send.
     */
    value?: null | BigNumberish;
    /**
     *  The chain ID the transaction is valid on.
     */
    chainId?: null | BigNumberish;
    /**
     *  The transaction hash.
     */
    hash?: null | string;
    /**
     *  The signature provided by the sender.
     */
    signature?: null | SignatureLike;
    /**
     *  The access list for berlin and london transactions.
     */
    accessList?: null | AccessListish;
    /**
     *  The maximum fee per blob gas (see [[link-eip-4844]]).
     */
    maxFeePerBlobGas?: null | BigNumberish;
    /**
     *  The versioned hashes (see [[link-eip-4844]]).
     */
    blobVersionedHashes?: null | Array<string>;
    /**
     *  The blobs (if any) attached to this transaction (see [[link-eip-4844]]).
     */
    blobs?: null | Array<BlobLike>;
    /**
     *  An external library for computing the KZG commitments and
     *  proofs necessary for EIP-4844 transactions (see [[link-eip-4844]]).
     *
     *  This is generally ``null``, unless you are creating BLOb
     *  transactions.
     */
    kzg?: null | KzgLibraryLike;
    /**
     *  The [[link-eip-7594]] BLOb Wrapper Version used for PeerDAS.
     *
     *  For networks that use EIP-7594, this property is required to
     *  serialize the sidecar correctly.
     */
    blobWrapperVersion?: null | number;
    /**
     *  The [[link-eip-7702]] authorizations (if any).
     */
    authorizationList?: null | Array<Authorization>;
}

export declare type TransportIdentifier = (typeof transports)[keyof typeof transports];

export declare const transports: {
    readonly bluetooth: "WEB-BLE-RN-STYLE";
    readonly hid: "WEB-HID";
};

declare interface TypedData {
    domain: TypedDataDomain;
    types: Record<string, Array<TypedDataField>>;
    message: Record<string, any>;
    primaryType?: string;
}

/**
 *  The domain for an [[link-eip-712]] payload.
 */
declare interface TypedDataDomain {
    /**
     *  The human-readable name of the signing domain.
     */
    name?: null | string;
    /**
     *  The major version of the signing domain.
     */
    version?: null | string;
    /**
     *  The chain ID of the signing domain.
     */
    chainId?: null | BigNumberish;
    /**
     *  The the address of the contract that will verify the signature.
     */
    verifyingContract?: null | string;
    /**
     *  A salt used for purposes decided by the specific domain.
     */
    salt?: null | BytesLike;
}

/**
 *  A specific field of a structured [[link-eip-712]] type.
 */
declare interface TypedDataField {
    /**
     *  The field name.
     */
    name: string;
    /**
     *  The type of the field.
     */
    type: string;
}

export declare function unsubscribeCheckDeviceListeners(): void;

/**
 * Defined this type inline here to avoid dependency issues.
 * For some reason bundler places this type in src and using ./src import
 * causes issues in the main repository.
 */
export declare type UserInteractionRequested = "none" | "unlock-device" | "allow-secure-connection" | "confirm-open-app" | "sign-transaction" | "sign-typed-data" | "allow-list-apps" | "verify-address" | "sign-personal-message" | "sign-delegation-authorization" | "web3-checks-opt-in" | "verify-safe-address";

export { }
