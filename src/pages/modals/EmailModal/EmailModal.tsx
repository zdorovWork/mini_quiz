import { useState } from "react";
import { Button, Input, Modal, Typography } from "../../../components";
import { validateEmail } from "../../../utils/validation";

type TEmailModalProps = {
  initialEmail?: string;
  closeModal: (data: { email: string } | null) => void;
};

export const EmailModal = ({ initialEmail, closeModal }: TEmailModalProps) => {
  const [emailInput, setEmailInput] = useState(initialEmail || "");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSaveEmail = () => {
    if (!emailInput.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    closeModal({ email: emailInput });
  };

  return (
    <Modal isOpen onClose={() => closeModal(null)}>
      <div style={{ marginBottom: "24px" }}>
        <Typography size="large" weight="bold" as="h2">
          Enter Your Email
        </Typography>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <Input
          type="email"
          value={emailInput}
          onChange={handleEmailChange}
          placeholder="your.email@example.com"
          error={emailError}
        />
      </div>

      <Button variant="primary" fullWidth onClick={handleSaveEmail}>
        Save & Continue
      </Button>
    </Modal>
  );
};
