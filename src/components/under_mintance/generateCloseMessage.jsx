import styles from "./undermaintence.module.css";
const generateCloseMessage = (closeMsg) => {
  console.log(closeMsg);
  return (
    <>
      <h1 className={styles.heading1}>{closeMsg.heading1}</h1>
      <h1 className={styles.heading2}>{closeMsg.heading2}</h1>
      <h5 className={styles.under_maintece}>{closeMsg.message1}</h5>
      <h5 className={styles.under_maintece} style={{ marginTop: "3rem" }}>
        {closeMsg.message2}
      </h5>
      <p className={styles.programming}>
        Programming:
        <a href="/" style={{ color: "#BCA53B", marginLeft: "10px" }}>
          {closeMsg.programmingLink}
        </a>
      </p>
    </>
  );
};

export default generateCloseMessage;
