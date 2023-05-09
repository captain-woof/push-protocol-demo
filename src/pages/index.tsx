import { useCallback, useState } from "react"
import axios from "axios";

export default function Home() {
  // States
  const [buttonProgress, setButtonProgress] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = useCallback(async () => {
    setButtonProgress(true);
    setResult("");

    try {
      await axios.post("/api/something", {
        title,
        description
      });
      setTitle("");
      setDescription("");
      setResult("SUCCESS! CHECK PUSH NOTIFICATION!")
    } catch (e) {
      console.error(e);
      setResult("ENCOUNTERED ERROR. CHECK CONSOLE.");
    } finally {
      setButtonProgress(false);
    }
  }, [title, description]);

  return (
    <>
      <h1>PUSH Demo</h1>

      {/** Where to subscribe and how */}
      <h2>Pre-requisites</h2>

      <ol>
        <li>
          Download <b>Staging</b> variant of either the <a href="https://docs.push.org/developers/developer-guides/testing-sent-notifications" target="_blank">browser extension, Android app or iOS app of Push</a> (to receive notifications)
        </li>

        <li>
          Go to <a href="https://staging.push.org/" target="_blank">Push App (Staging)</a>, go to Channels, search for <code style={{ userSelect: 'all' }}>0xb31cFE5180ea6AF048479FAFa041Adc656F45Fc2</code>, and Opt-in to the Test channel.
        </li>

        <li>
          Write some title and description, and click the button below
        </li>

        <li>
          Check your notifications
        </li>
      </ol>

      {/** Button to invoke notification */}
      <h2>Invoke notification</h2>

      <input placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }}></input>

      <textarea placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>

      <button onClick={handleButtonClick} disabled={buttonProgress || title === "" || description === ""}>
        {buttonProgress ? "Doing it" : "Do something important"}
      </button>

      {/** Result */}
      {result &&
        <>
          <h2>Result</h2>
          <pre>{result}</pre>
        </>
      }
    </>
  )
}
