import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { X } from "phosphor-react";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/withdraw.svg";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { useTransaction } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransaction();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category,
    });

    setTitle("");
    setAmount(0);
    setType("");
    setCategory("");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <X className="react-modal-close" size={28} onClick={onRequestClose} />
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => {
            setAmount(Number(event.target.value));
          }}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            activeColor="green"
            isActive={type === "deposit"}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            activeColor="red"
            isActive={type === "withdraw"}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <button type="submit">Cadastrar</button>
        {/* <select name="" id="">
          <option value="venda">Venda</option>
          <option value="casa">Casa</option>
          <option value="comida">Comida</option>
          <option value="lazer">Lazer</option>
        </select> */}
      </Container>
    </Modal>
  );
}
