import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../context/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, sigOut } = useContext(AuthContext);
  const [message, setMessege] = useState("");

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }

    await api.post("messages", { message });

    setMessege("");
  };

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={sigOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" /> {user?.login}
        </span>
      </header>
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          onChange={(e) => setMessege(e.target.value)}
          value={message}
          placeholder="Qual sua expectativa para o evento ? "
        />
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
