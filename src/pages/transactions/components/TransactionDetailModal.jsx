import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import React from "react";

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-xl font-semibold">Transaction Details</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <strong>Course:</strong> {transaction.course}
            </div>
            <div>
              <strong>Transaction Date:</strong> {transaction.transactionDate}
            </div>
            <div>
              <strong>Status:</strong> {transaction.status}
            </div>
            <div>
              <strong>Total:</strong> ${transaction.total.toFixed(2)}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailModal;
