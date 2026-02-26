import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Address } from "@/types";
import { FiEdit3 } from "react-icons/fi";

// #region CartAddress
interface CartAddressProps {
  address: Address | null;
  cartState: number;
  setCartState: (state: number) => void;
  setSelectedAddress: (address: Address | null) => void;
}
export default function CartSdAddress({
  address,
  cartState,
  setCartState,
  setSelectedAddress,
}: CartAddressProps) {
  return (
    <Card>
      <CardContent>
        <div className="text-io-text-primary flex items-center justify-between pb-6">
          <p className="text-lg font-bold">Endereço</p>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-io-text-primary h-7"
            onClick={() => {
              setCartState(1);
              setSelectedAddress(null);
            }}
          >
            <FiEdit3 className="mr-2 h-4 w-4" /> Editar
          </Button>
        </div>
        {!address ? (
          <div> No address found. </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="text-io-text-primary text-sm font-semibold">
                {address.fullName}
              </p>
            </div>
            <div className="text-io-text-secondary flex flex-col gap-1 text-sm">
              <p>{address.logradouro}</p>
              <p>{`Numero:  ${address.numero}, ${address.complemento} `}</p>
              <p>{`CEP:  ${address.cep} - ${address.cidade}, ${address.estado} `}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// #endregion
