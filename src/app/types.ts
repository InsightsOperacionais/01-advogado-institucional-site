// #region ---------------- USER ----------------

export type User = {
  id: string;
  name: string | null;
  lastName: string | null;
  email: string | null;
  address: Address | null;
  emails: UserEmailAccount[] | null;
  emailApp: UserEmailApp | null;
  about: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  status: "Active" | "Inactive" | "Banned" | "Suspended";
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

export type UserRole = "SuperAdmin" | "Admin" | "User";

export type Customer = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: Address | null;
  about: string | null;
  emailVerified: Date | null;
  image: string | null;
  customerOrders: CustomerOrder[];
  status: "Active" | "Inactive" | "Banned" | "Suspended";
  orders: Order[];
  reviews: Shop.Review[];
  restockWish: RestockWish[];
};

export type RestockWish = {
  id: string;
  product: Shop.Product;
  email: string;
  date: Date;
  customerId: string | null;
};

// #endregion

// #region ---------------- PRODUCT ----------------

export namespace Shop {
  // --- ENUMS & UNIONS (Espelhando o Prisma) ---
  export type ProductType = "VARIABLE" | "SIMPLE";
  export type ProductStatus = "PUBLISHED" | "ARCHIVED" | "DRAFT";
  export type ProductVisibility = "PUBLIC" | "PRIVATE" | "HIDDEN";
  export type ImageRole = "COVER" | "HOVER" | "GALLERY";
  export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK";
  export type StockMovementType =
    | "INITIAL"
    | "RESTOCK"
    | "SALE"
    | "RETURN"
    | "LOSS"
    | "ADJUSTMENT"
    | "TRANSFER";

  export type AttributeTypes = "DEFAULT" | "COLOR";
  export type ProductPageType =
    | "DEFAULT"
    | "COLOR"
    | "SELECT"
    | "CHECKBOX"
    | "RATIO";
  export type FilterPageType =
    | "DEFAULT"
    | "COLOR"
    | "SELECT"
    | "CHECKBOX"
    | "RATIO";

  // --- CORE MODELS ---

  export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    content: string | null;

    type: ProductType;
    status: ProductStatus;
    visibility: ProductVisibility;

    categoryId?: string | null;
    category?: ProductCategory | null;

    images?: ProductImage[];

    options?: OptionsOnProducts[];

    attributes?: AttributeOnProduct[];

    variations?: ProductVariation[];

    properties: ProductProperties | null;

    metaTitle?: string | null;
    metaDescription?: string | null;
    tags?: string[];

    reviews?: Review[];
    collections?: Collection[];
    sortOrder: number;

    createdAt: Date;
    updatedAt: Date;
  };

  export type ProductVariation = {
    id: string;
    sku: string | null;

    price: number;
    salePrice: number | null;

    stock: number;
    stockAlert: number | null;
    stockStatus: StockStatus;
    idealStock?: number | null;

    weight: number | null;
    width: number | null;
    height: number | null;
    depth: number | null;

    productId: string;
    product?: Product;

    optionValues?: ProductOptionValue[];

    images?: ProductImage[];

    createdAt: Date;
    updatedAt: Date;
  };

  export type StockMovement = {
    id: string;
    variationId: string;
    type: StockMovementType;
    quantity: number;
    reason: string | null;
    userId: string;
    createdAt: Date;
  };

  export type ProductImage = {
    id: string;
    url: string;
    altText: string | null;
    role: ImageRole;
    order: number;

    productId: string;
    variationId?: string | null;

    createdAt: Date;
    updatedAt: Date;
  };

  // --- SISTEMA DE OPÇÕES (Variações e Escolhas do Cliente) ---

  export type OptionsOnProducts = {
    productId: string;
    optionId: string;
    option?: ProductOptions;
    order: number;
  };

  export type ProductOptions = {
    id: string;
    name: string;
    order: number;
    type: AttributeTypes;
    productPageType: ProductPageType;
    filterPageType: FilterPageType;

    values?: ProductOptionValue[];
    products?: OptionsOnProducts[];

    createdAt: Date;
    updatedAt: Date;
  };

  export type ProductOptionValue = {
    id: string;
    name: string;
    value: string;
    label: string | null;
    order: number;

    optionId: string;
    option?: ProductOptions;

    variations?: ProductVariation[];

    createdAt: Date;
    updatedAt: Date;
  };

  // --- SISTEMA DE ATRIBUTOS (Especificações e Filtros) ---

  export type ProductAttribute = {
    id: string;
    name: string;
    slug: string;
    showInFilter: boolean;
    showInProduct: boolean;
    order: number;

    values?: ProductAttributeValue[];

    createdAt: Date;
    updatedAt: Date;
  };

  export type ProductAttributeValue = {
    id: string;
    value: string;
    label: string | null;

    attributeId: string;
    attribute?: ProductAttribute;

    products?: AttributeOnProduct[];

    createdAt: Date;
    updatedAt: Date;
  };

  export type AttributeOnProduct = {
    productId: string;
    valueId: string;
    value?: ProductAttributeValue;
    createdAt: Date;
  };

  // --- OUTROS MODELS ---

  export type ProductCategory = {
    id: string;
    slug: string;
    name: string;
    imageUrl: string | null;
    description: string | null;
    visibility: boolean;
    order: number;

    parentId: string | null;
    parent?: ProductCategory | null;
    children?: ProductCategory[];
    products?: Product[];

    createdAt: Date;
    updatedAt: Date;
  };

  export type Review = {
    id: string;
    name: string;
    image: string | null;
    platform: string;
    rating: number;
    link: string | null;
    comment: string;
    customerId?: string;
    productId?: string;

    createdAt: Date;
    updatedAt: Date;
  };

  export type Collection = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    products?: Product[];

    createdAt: Date;
    updatedAt: Date;
  };

  // --- HELPER TYPES ---

  export type ProductProperties = {
    minQuantity?: number;
    multiQuantity?: number;
    label?: {
      sale: { state: boolean; value: string };
      new: { state: boolean; value: string };
    };
    [key: string]: any;
  };

  export type VariationFormData = {
    id?: string;
    sku: string | null;
    price: number;
    salePrice: number | null;
    stock: number;
    stockStatus: StockStatus;
    stockAlert: number | null;
    weight?: number;
    width?: number;
    height?: number;
    depth?: number;

    // Agora usando optionValueIds para o que gera SKU
    optionValueIds: string[];
    imageUrls?: string[];
  };

  export type ProductImageSet = {
    cover: ProductImage | null;
    hover: ProductImage | null;
    gallery: ProductImage[];
  };
}

export namespace Marketing {
  export type Coupon = {
    id: string;
    code: string;
    description: string | null;

    // Tipo de desconto
    discountType: "Percentage" | "FixedValue" | "FreeShipping";
    value: number;

    // Regras de Validade
    startDate: Date;
    endDate: Date | null;
    isActive: boolean;

    // Regras de Limitação
    usageLimit: number | null;
    usageCount: number;
    usageLimitPerUser: number | null;

    // Regras Condicionais (Min/Max)
    minOrderValue: number | null;
    maxDiscountValue: number | null;

    // Restrições de Escopo
    appliesTo: "AllProducts" | "SpecificProducts" | "SpecificCategories";
    targetIds: string[];

    createdAt: Date;
    updatedAt: Date;
  };
}

// app/types/shop-settings.ts
export namespace ShopSettings {
  // === GERAL ===
  export type General = {
    storeInfo: {
      storeName: string;
      cnpj: string;
      ie: string;
      logoUrl?: string;
      description?: string;
      website?: string;
    };
    contactInfo: {
      email: string;
      phone: string;
      whatsapp?: string;
      supportEmail?: string;
    };
    address: {
      street: string;
      number: string;
      complement?: string;
      reference?: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    businessHours?: {
      mondayToFriday: string;
      saturday: string;
      sunday: string;
      holidays?: string;
    };
    currency: {
      code: "BRL" | "USD" | "EUR";
      symbol: string;
      decimalSeparator: string;
      thousandSeparator: string;
    };
    timezone: string;
  };

  // === ENVIO ===
  export type Shipping = {
    deliveryMethods: DeliveryMethod[];
    freeShipping: {
      enabled: boolean;
      minimumValue: number;
      includedRegions: string[];
      excludedRegions: string[];
    };
    boxes: ShippingBox[];
    advancedOptions: {
      allowShippingCalculator: boolean;
      showDeliveryTime: boolean;
      useOwnContract: boolean;
      declaredValue: boolean;
      receiptNotification: boolean;
      ownHandDelivery: boolean;
      collectOnDelivery: boolean;
    };
    handlingFee: {
      enabled: boolean;
      type: "fixed" | "percentage";
      value: number;
    };
    weightUnit: "kg" | "g";
    dimensionUnit: "cm" | "m";
    shippingZones: ShippingZone[];
  };

  export type DeliveryMethod = {
    id: string;
    name: string;
    carrier: string;
    serviceCode?: string;
    deliveryTime: {
      minDays: number;
      maxDays: number;
    };
    price: number | "calculate";
    calculationMethod?: "weight" | "volume" | "fixed" | "price";
    availableRegions?: string[];
    additionalConfig?: Record<string, any>;
    active: boolean;
  };

  export type ShippingBox = {
    id: string;
    name: string;
    imageUrl?: string;
    dimensions: {
      width: number;
      length: number;
      height: number;
    };
    maxWeight: number;
    default?: boolean;
    active: boolean;
  };

  export type ShippingZone = {
    id: string;
    name: string;
    regions: string[];
    methods: string[];
    enabled: boolean;
  };

  // === PAGAMENTO ===
  export type Payment = {
    paymentMethods: PaymentMethod[];
    installmentOptions: {
      enabled: boolean;
      maxInstallments: number;
      minInstallmentValue: number;
      interestFreeInstallments: number;
      interestRates?: {
        [installments: number]: number;
      };
    };
    advanced: {
      allowPartialPayment: boolean;
      enableBoletoDiscount: boolean;
      boletoDiscountPercentage: number;
      enablePixDiscount: boolean;
      pixDiscountPercentage: number;
      allowPaymentRetry: boolean;
      maxRetryDays: number;
    };
    antifraud: {
      enabled: boolean;
      provider?: "clearsale" | "konduto" | "custom";
      minValueForAnalysis: number;
    };
  };

  export type PaymentMethod = {
    id: string;
    name: string;
    type: "credit_card" | "debit_card" | "pix" | "boleto" | "bank_transfer";
    provider: "mercadopago" | "pagseguro" | "pagarme" | "custom" | "offline";
    enabled: boolean;
    credentials?: Record<string, any>;
    additionalFees?: {
      type: "fixed" | "percentage";
      value: number;
    };
    minAmount?: number;
    maxAmount?: number;
    instructions?: string;
  };

  // === NOTIFICAÇÕES ===
  export type Notifications = {
    emailTemplates: {
      orderConfirmation: boolean;
      paymentConfirmation: boolean;
      shippingConfirmation: boolean;
      orderDelivered: boolean;
      orderCancelled: boolean;
      abandonedCart: boolean;
    };
    adminNotifications: {
      newOrder: boolean;
      orderCancelled: boolean;
      lowStock: boolean;
      paymentReceived: boolean;
      newCustomer: boolean;
    };
    customerNotifications: {
      marketingEmails: boolean;
      orderUpdates: boolean;
      productUpdates: boolean;
      newsletter: boolean;
      reviewReminder: boolean;
    };
    smsNotifications?: {
      enabled: boolean;
      orderConfirmation: boolean;
      shippingUpdate: boolean;
      paymentReminder: boolean;
    };
    whatsappNotifications?: {
      enabled: boolean;
      orderConfirmation: boolean;
      shippingUpdate: boolean;
    };
    webhookUrls?: {
      orderCreated?: string;
      orderUpdated?: string;
      paymentReceived?: string;
    };
  };

  // === INTEGRAÇÕES ===
  export type Integrations = {
    analytics: {
      googleAnalyticsId?: string;
      facebookPixelId?: string;
      googleTagManagerId?: string;
    };
    marketplaces: {
      mercadoLivre?: MarketplaceConfig;
      shopee?: MarketplaceConfig;
      amazon?: MarketplaceConfig;
    };
    erp: {
      enabled: boolean;
      provider?: "blings" | "tiny" | "omie" | "custom";
      apiKey?: string;
      syncOrders: boolean;
      syncProducts: boolean;
      syncCustomers: boolean;
    };
    emailService: {
      provider?: "sendgrid" | "mailchimp" | "amazon_ses" | "custom";
      apiKey?: string;
      fromEmail: string;
      fromName: string;
    };
  };

  type MarketplaceConfig = {
    enabled: boolean;
    apiKey?: string;
    syncProducts: boolean;
    syncOrders: boolean;
  };

  // === TIPO COMPLETO ===
  export type Settings = {
    general: General;
    shipping: Shipping;
    payment: Payment;
    notifications: Notifications;
    integrations: Integrations;
    updatedAt: Date;
  };
}

// #endregion

// #region ---------------- CART ----------------

export type CartProduct = {
  id: string;
  slug: string;
  productId: string;
  variationId: string;
  subAttributes: string | null;
  name: string;
  image: string;
  price: number;
  quantity: number;
  availableQuantity: number;
  minQuantity: number;
  multiQuantity: number;
};

export type CartPayment = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

export interface CartDelivery {
  id: string;
  name: string;
  price: number;
  delivery_time?: number;
  delivery_range: {
    min: number;
    max: number;
  };
  company: {
    name: string;
    picture?: string;
  };
  icon?: React.ReactNode;
  originalData?: any;
}

// #endregion

// #region ---------------- PAYMENT ----------------
export type CheckoutReq = {
  customerId?: string;
  address?: Address;
  paymentMethod?: CartPayment;
  deliveryMethod?: CartDelivery;
  customerInfo?: OrderCustomerInfo;
  coupon?: Coupon;
  products: CartProduct[];
};

export type Coupon = {
  code: string;
  discount: number;
  discountType: string;
};

export type CustomerOrder = {
  id: string;
  order: number;
  customerId: string | null;
  items: unknown;
  address: unknown;
  paymentDetails: unknown;
  amount: unknown;
  phone: string | null;
  customerInfo: unknown;
  status: OrderStatus;
  transitionStatus: "Completed" | "Pending";
  createdAt: Date;
};

// #endregion

// #region ---------------- SHIPPING ----------------

export type Address = {
  id: string;
  identification: string;
  default: boolean;
  fullName: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | "";
  referencia: string | "";
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  telefone: string;
};

export type MelhorEnvioShippingOption = {
  id: number;
  name: string;
  price: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  company: {
    name: string;
    picture: string;
  };
};

// #endregion

// #region ---------------- UTILS ----------------

export type Mail = {
  id?: string | null;
  image?: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  readStatus: boolean;
  sent: boolean;
  draft: boolean;
  deleted: boolean;
  spam: boolean;
  important: boolean;
  starred: boolean;
  archived: boolean;
  date: Date;
};
export type ZohoMail = {
  summary: string;
  sentDateInGMT: string;
  calendarType: number;
  subject: string;
  messageId: string;
  threadCount: string;
  flagid: string;
  status2: string;
  priority: string;
  hasInline: string;
  toAddress: string;
  folderId: string;
  ccAddress: string;
  threadId: string;
  hasAttachment: string;
  size: string;
  sender: string;
  receivedTime: string;
  fromAddress: string;
  status: string;
};

export type UserEmailApp = {
  currentAccountId: string;
  accounts: UserEmailAccount[];
};

export type UserEmailAccount = {
  provider?: string;
  accessToken?: string;
  refreshToken?: string;
  accountId?: string;
  emailAddress?: string;
  folders?: UserEmailFolder[];
};

export type UserEmailFolder = {
  folderId: string;
  folderName: string;
  path: string;
  isArchive: number;
};

export type EmailTab =
  | "all"
  | "inbox"
  | "sent"
  | "draft"
  | "spam"
  | "trash"
  | "archive"
  | "important"
  | "starred";

// #endregion

// #region ---------------- ORDER ----------------------------------------------

export type Order = {
  id: string;
  order: number;
  items: OrderItem[];
  address: Address | null;
  paymentDetails: OrderPaymentDetails | null;
  deliveryDetails: OrderDeliveryDetails | null;
  history: OrderHistory;
  customerInfo: OrderCustomerInfo | null;
  amount: OrderAmount | null;
  nfe: OrderNFe | null;
  melhorEnvio: OrderMelhorEnvio | null;
  status: OrderStatus;
  createdAt: Date;
  customer: Customer | null;
  customerId: string | null;
};

export type OrderStatus =
  | "PendingPayment"
  | "PaymentApproved"
  | "Processing"
  | "Shipped"
  | "InTransit"
  | "Completed"
  | "OnHold"
  | "RefundPending"
  | "Refunded"
  | "Canceled";

export type OrderItem = {
  id: string;
  variationId: string;
  image: string;
  name: string;
  subAttributes: string;
  quantity: number;
  price: number;
};

export type OrderAmount = {
  amount_subtotal: number;
  amount_taxes: number;
  amount_shipping: number;
  amount_discount: number;
  amount_total: number;
};

export type OrderPaymentDetails = {
  method: "card" | "boleto" | "pix";
  methodId: string;
  method_info?: {
    card?: {
      brand: string;
      type: "credit_card" | "debit_card" | "unknown";
      installments: string;
      last4: string;
      transaction_details: {
        total_paid_amount: number;
        installment_amount: number;
      };
    };
  };
};

export type OrderDeliveryDetails = {
  name: string;
  price: number;
  speedy?: string;
  trackingNumber?: string;
  delivery_time?: number;
  delivery_range: {
    min: number;
    max: number;
  };
  company: {
    name: string;
    picture?: string;
  };
  originalData?: any;
};

export type OrderCustomerInfo = {
  fullName?: string | null;
  email?: string | null;
  cpf?: string | null;
  cnpj?: string | null;
  ie?: string | null;
  discord?: string | null;
  characterName?: string | null;
  additionalInfo?: string | null;
};

export type OrderHistory = {
  historyInfo: {
    orderTime: Date | null;
    paymentTime: Date | null;
    deliveryToCarrierTime: Date | null;
    completionTime: Date | null;
  };
  deliverySteps: {
    title: string;
    time: Date;
    status: "pending" | "completed";
  }[];
};

export type OrderNFe = {
  id: string;
  key: string;
  numberNfe: string;
  status: string;
  xml: string;
  pdf: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderMelhorEnvio = {
  id: string;
  status: string;
  tracking?: string;
  me_tracking?: string;
  ticket?: {
    status?: boolean;
    previewUrl?: string;
    printUrl?: string;
  };
};

// #endregion

// #region ---------------- BLOG -----------------------------------------------
export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  publish: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string[];
  imageUrl: string;
  tags: string[];
  postCategoryId: string | null;
  author: string;
  readTime: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PostCategory = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
};

export type BlogCards = {
  id: string;
  slug: string;
  title: string;
  description: string;
  data: Date | null;
  link: string | null;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string | null;
  subcategoryId: string | null;
};

export type BlogCardsCategory = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  blogCards: BlogCards[];
};

// #endregion

// #region ---------------- TOOLS -----------------------------------------------

export type FormData = {
  key: string;
  title: string;
  value: string;
  label: string;
};

export type UISettings = {
  compactMode: boolean;
  darkMode: boolean;
  contrastMode: boolean;
  rtlMode: boolean;
};
// #endregion

// #region ---------------- LADING PAGE -----------------------------------------------

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isWhatsApp: boolean;
  message: string | null;
  bestTime: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Pixel = {
  id: string;
  name: string;
  script: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// #endregion

// #region ---------------- APPOINTMENT -----------------------------------------------

export namespace Appointment {
  export type AppointmentStatus =
    | "PENDING"
    | "CONFIRMED"
    | "CANCELED"
    | "COMPLETED"
    | "NO_SHOW";

  export interface AppointmentEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    status: AppointmentStatus;
    customerName: string;
    customerEmail: string | null;
    customerPhone: string | null;
    notes?: string;
    userId?: string;
  }
}
// #endregion

export namespace Settings {
  export type ContactConfig = {
    phoneSlugs: string[];
    allowWhatsAppToggle: boolean;
    requireActiveToggle: boolean;
  };

  export type SocialMediaConfig = {
    platformSlugs: string[];
    requireActiveToggle: boolean;
  };

  export type ExternalLinksConfig = {
    linkSlugs: string[];
    requireActiveToggle: boolean;
  };

  export type ImagesConfig = {
    imageSlugs: string[];
    requireActiveToggle: boolean;
  };

  // ========== DADOS REAIS ==========
  export type Settings = {
    id: string;
    // Configurações
    contactConfig: ContactConfig | null;
    socialMediaConfig: SocialMediaConfig | null;
    externalLinksConfig: ExternalLinksConfig | null;
    imagesConfig: ImagesConfig | null;

    // Dados
    address: Address | null;
    contact: Contact | null;
    socialMedia: SocialMedia[] | null;
    externalLinks: ExternalLink[] | null;
    images: Image[] | null;

    // Outros campos
    googleAnalyticsId: string | null;
    googleTagManagerId: string | null;
    metaPixelId: string | null;
    privacyPolicy: string | null;
    termsOfUse: string | null;

    shippingSettings: ShippingSettings | null;

    createdAt: Date;
    updatedAt: Date;
  };

  export type Address = {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    googleMapsLink: string;
  };

  export type Contact = {
    phones: Phone[];
    email: string;
    businessHours: string;
  };

  export type Phone = {
    slug: string;
    name: string;
    number: string;
    isWhatsApp: boolean;
    active: boolean;
    description: string;
    order: number;
  };

  export type SocialMedia = {
    slug: string;
    platformKey: string;
    platformName: string;
    description: string;
    url: string;
    active: boolean;
    order: number;
  };

  export type ExternalLink = {
    slug: string;
    name: string;
    url: string;
    description: string;
    active: boolean;
    order: number;
  };

  export type Image = {
    slug: string;
    label: string;
    description: string;
    url: string;
    alt: string;
    active: boolean;
    required: boolean;
    order: number;
  };

  export type ShippingSettings = {
    sender: {
      nome: string;
      cnpj: string;
      ie: string;
      cep: string;
      logradouro: string;
      numero: string;
      complemento: string | "";
      referencia: string | "";
      bairro: string;
      cidade: string;
      estado: string;
      pais: string;
      telefone: string;
      email: string;
    };
    deliveryMethods: {
      id: string;
      name: string;
      carrier: string;
      deliveryTime: {
        minDays: number;
        maxDays: number;
      };
      price: number | "calculate";
      availableRegions?: string[];
    }[];
    freeShipping: {
      enabled: boolean;
      minimumValue: number;
      includedRegions: string[];
      excludedRegions: string[];
    };
    boxes: {
      id: string;
      name: string;
      imageUrl: string | null;
      dimensions: {
        width: number;
        length: number;
        height: number;
      };
      maxWeight: number;
    }[];
    advancedOptions: {
      allowShippingCalculator: boolean;
      showDeliveryTime: boolean;
      useOwnContract: boolean;
      declaredValue: boolean;
      receiptNotification: boolean;
      ownHandDelivery: boolean;
    };
    handlingFee: {
      type: "fixed" | "percentage";
      value: number;
    };
  };
}
