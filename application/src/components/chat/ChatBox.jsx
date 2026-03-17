"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Message from "./Message";
import { PulseLoader } from "react-spinners";

export default function ChatBox() {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([ ["ai", `Here are some questions and responses about the SingHealth data breach, generated from the provided information:

### General Overview & Timeline

**Q: Provide a comprehensive summary of the SingHealth Data Breach.**

**A:** The SingHealth Data Breach was a cyberattack of unprecedented scale and sophistication carried out on the SingHealth patient database between August 23, 2017, and July 20, 2018. Personal particulars of 1.5 million patients, including names, NRIC numbers, addresses, and dates of birth, were illegally accessed and exfiltrated between June 27, 2018, and July 4, 2018. Additionally, around 159,000 of these patients also had their outpatient dispensed medication records exfiltrated. The Prime Minister's personal and outpatient medication data was specifically targeted and repeatedly accessed. The attack involved initial access via infected front-end workstations, likely through phishing attacks, followed by a period of dormancy, lateral movement within the network, compromise of Citrix servers connected to the SCM database, and ultimately the querying and exfiltration of patient data.

**Q: Summarise the overall timeline of the SingHealth cyberattack from initial entry to data exfiltration.**

**A:** The SingHealth cyberattack began with initial entry around August 23, 2017, likely via phishing attacks infecting front-end workstations. The attacker then lay dormant for 4 months. From December 2017 to June 2018, a 6-month period of lateral movement and privilege escalation occurred, compromising endpoints, servers, and a large number of user and administrator accounts, including Citrix servers connected to the SCM database. Starting May 2018, the attacker used compromised workstations and suspected virtual machines to remotely connect to SGH Citrix servers. The SCM system was compromised on June 26, 2018. Finally, data exfiltration, including querying the SCM database and transferring data, took place between June 27, 2018, and July 4, 2018, with the overall attack concluding by July 20, 2018.

### Attacker Profile & Methods

**Q: Characterize the attacker involved in the SingHealth Cyber Breach.**

**A:** The attacker in the SingHealth Cyber Breach was identified as a skilled and sophisticated actor. This actor exhibited the characteristics of an Advanced Persistent Threat (APT) group, possessing advanced capabilities, persistence over time, and the ability to maintain prolonged access to a network to achieve specific objectives.

**Q: What method was most likely used for the attacker's initial entry into the SingHealth IT network?**

**A:** The attacker's initial entry into the SingHealth IT network was most likely achieved through phishing attacks. These attacks infected front-end workstations around August 23, 2017.

**Q: Define 'lateral movement' in the context of the SingHealth cyberattack.**

**A:** In the context of the SingHealth cyberattack, 'lateral movement' refers to the attacker's activity within the network after gaining initial access. Following a four-month dormancy period, the attacker commenced lateral movement for six months (December 2017 - June 2018), compromising many endpoints and servers, including Citrix servers. This process allowed the attacker to expand their foothold and reach critical systems like the SCM database.

**Q: Explain the role of Citrix servers in the attack workflow, particularly in relation to the SCM database.**

**A:** Citrix servers played a crucial role in the attack workflow by serving as a conduit to the SCM database. During the lateral movement phase, the attacker compromised Citrix servers located in SGH that were connected to the SCM database. From May 2018, the attacker utilized compromised user workstations and suspected virtual machines to remotely connect to these SGH Citrix servers, which allowed the attacker to query the SCM database and facilitate the transfer of exfiltrated data.

**Q: Outline the flow of data exfiltration from the SCM DB Servers to the Internet.**

**A:** The flow of data exfiltration from the SCM DB Servers to the Internet occurred between June 27, 2018, and July 4, 2018. First, the SCM database was queried via CITRIX Server 1 @SGH. Then, data was transferred from the SCM DB Servers to CITRIX Server 2 @SGH. From CITRIX Server 2 @SGH, the data was transferred to Workstation A. Finally, the data was exfiltrated from Workstation B via the Internet.

### Affected Data

**Q: How many patients were affected by the SingHealth Data Breach, and what additional data was compromised for a subset of them?**

**A:** A total of 1.5 million patients had their personal particulars illegally accessed and exfiltrated during the SingHealth Data Breach. These personal particulars included names, NRIC numbers (National Registration Identity Card numbers), addresses, and dates of birth. For a subset of these patients, specifically around 159,000 individuals, their outpatient dispensed medication records were also exfiltrated.

**Q: Which high-profile individual's data was specifically targeted in the SingHealth cyberattack?**

**A:** The Prime Minister's personal and outpatient medication data was specifically targeted and repeatedly accessed during the SingHealth cyberattack.

**Q: What is the difference between 'personal particulars' and 'outpatient dispensed medication records' as exfiltrated data?**

**A:** In the SingHealth Data Breach, 'personal particulars' refer to basic identifying information of patients, which included names, NRIC numbers, addresses, and dates of birth. 'Outpatient dispensed medication records,' on the other hand, refer to specific medical information detailing the medications prescribed and dispensed to patients during outpatient visits. While personal particulars identify the individual, medication records provide sensitive health-related data. Both types of data were exfiltrated, with personal particulars affecting 1.5 million patients and medication records affecting a subset of 159,000 of those patients.

### System Components & Roles

**Q: Can you summarise what the SCM database is and its purpose?**

**A:** The SCM database is the central repository for patient electronic medical records within the SingHealth network. SCM, which stands for an electronic medical records software solution, allows healthcare staff to access real-time patient data. Its purpose is to store and manage these critical medical records, enabling healthcare professionals to provide care efficiently.

**Q: What critical role did Citrix servers play in the SingHealth Cyber Attack?**

**A:** Citrix servers played a critical role in the Cyber Attack. They serve as an intermediary for users to access the SCM database, which contains patient electronic medical records. During the attack, the attacker compromised many endpoints and servers, including the Citrix servers located in SGH (SingHealth), which were connected to the SCM database. From May 2018, the attacker made use of compromised user workstations and suspected virtual machines to remotely connect to these SGH Citrix servers, ultimately facilitating access to the SCM database for querying and data exfiltration.

**Q: Who owned the SCM system at the time of the SingHealth Cyber Attack?**

**A:** At the time of the Cyber Attack, SingHealth owned the SCM system.

### IHiS Roles & Failures

**Q: Summarise IHiS's role in cybersecurity measures for SingHealth.**

**A:** IHiS, or Integrated Health Information Systems Private Limited, was responsible for implementing cybersecurity measures for the SingHealth SCM system. This responsibility encompassed putting in place safeguards and protocols to protect the electronic medical records software solution and its associated patient data from cyber threats. Additionally, IHiS was also responsible for security incident response and reporting, which is a crucial aspect of cybersecurity management.

**Q: Explain the failures of certain IHiS staff in IT security incident response during the SingHealth Cyber Breach.**

**A:** Certain IHiS staff, who held key roles in IT security incident response and reporting, failed to take appropriate, effective, or timely action. These failures resulted in missed opportunities to prevent the stealing and exfiltrating of data during the attack.

**Q: What were the implications of IHiS staff lacking adequate cybersecurity awareness and training?**

**A:** The implications of IHiS staff lacking adequate cybersecurity awareness and training were that they could not fully appreciate the security implications of their findings and could not respond effectively to the attack.

### Vulnerabilities & Inevitability

**Q: Were the vulnerabilities in the SingHealth network and SCM system remediable before the attack?**

**A:** Yes, many of the vulnerabilities, weaknesses, and misconfigurations in the SingHealth network and SCM system could have been remedied before the attack occurred.

**Q: What is the significance of the attacker's success not being inevitable?**

**A:** The significance of the attacker's success not being inevitable suggests that despite the challenges posed by APTs and the difficulty in preventing breaches, the outcome of the SingHealth Cyber Breach could have been different. This implies that improved defenses, better incident response, or remediation of existing vulnerabilities might have prevented or mitigated the data theft and exfiltration.

### Key Definitions & Comparisons

**Q: What is the difference between data being 'accessed' and 'exfiltrated' in the context of the breach?**

**A:** In the context of the breach, data was "illegally accessed" between August 23, 2017, and July 20, 2018, meaning the attackers gained unauthorized entry and viewed the data. "Exfiltrated" specifically refers to the unauthorized transfer of that data out of the SingHealth system, which occurred for personal particulars and medication records between June 27, 2018, and July 4, 2018. So, access is about viewing, while exfiltration is about removing the data.

**Q: Define 'virtual machines' and how were they used by the attacker?**

**A:** 'Virtual machines' are software-based emulations of physical computer systems. They run an operating system and applications just like a physical computer but exist as software on a host machine. In the SingHealth cyberattack, starting from May 2018, the attacker made use of suspected virtual machines, in addition to compromised user workstations, to remotely connect to the SGH Citrix servers. This allowed the attacker to maintain a presence and facilitate access to critical systems.`], ["human","generate me some questions on the singhealth data breach, together with the responses to those questions"],]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (history.length && history[0][0] == "human") {
      setLoading(true);
      setMessage("");
      const ordered = [...history]; ordered.reverse();
      axios.post(`/api/chat`, {history: ordered, message})
        .then(({data: {response}}) => setHistory([
         ["ai", response],  ...history, 
        ]))
        .finally(() => setLoading(false));
    }
  }, [history]);

  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!message || loading) return;
    setHistory([
      ["human", message], ...history, 
    ]);
  }

  return <>
    <div className="h-full w-full overflow-y-auto flex flex-col-reverse gap-3 rounded-lg">
      {loading && <Message role={"ai"} message={<PulseLoader size={7} color="gray" />} />}
      {
        history.length ?
        history.map(([role, message], i) => <Message
          key={i} role={role} message={message} 
        />) :
        <div className="w-full h-full select-none text-gray-400 flex items-center justify-center text-center text-wrap">Send me a message to start chatting</div>
      }
    </div>
    <hr />
    <form className="flex flex-col gap-3 h-fit" onSubmit={send}>
      <input placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  </>
}
