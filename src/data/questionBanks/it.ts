import { Question } from '../../types';

export const IT_QUESTIONS: Question[] = [
  // ================= PROGRAMMING =================
  {
    id: 'it-prog-1',
    category: 'programming',
    categoryLabel: 'Programming & Automation Scripting',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Bash Shell Scripting & Exit Status',
    question: 'In Linux shell automation, what does the special variable `$?` represent immediately after executing a command, and which operator runs the next command ONLY if `$? == 0`?',
    codeSnippet: `#!/bin/bash
backup_database.sh
status=$?
if [ $status -eq 0 ]; then
  echo "Backup Succeeded"
fi`,
    options: [
      {
        id: 'opt-a',
        text: '`$?` holds the exit status code of the last executed command (0 = success); the `&&` operator chains execution upon zero exit status.',
        explanation: 'Correct! By POSIX standard, 0 signals successful completion, while non-zero represents an error code. `cmd1 && cmd2` executes cmd2 only if cmd1 succeeds.'
      },
      {
        id: 'opt-b',
        text: '`$?` stores the process ID (PID) of the current shell.',
        explanation: 'Incorrect: `$$` stores the current shell PID, while `$!` stores the last background job PID.'
      },
      {
        id: 'opt-c',
        text: '`$?` holds the total number of command-line arguments.',
        explanation: 'Incorrect: `$#` stores argument count.'
      },
      {
        id: 'opt-d',
        text: '`$?` outputs the current user ID.',
        explanation: 'Incorrect: `$UID` or `id -u` retrieves the user ID.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Shell Script Exit Codes & Logical Chaining'
  },

  // ================= NETWORKING =================
  {
    id: 'it-net-1',
    category: 'networking',
    categoryLabel: 'Enterprise Networking & Protocols',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Subnetting & CIDR Addressing',
    question: 'An enterprise network administrator is assigned the IPv4 subnet `192.168.10.0/26`. How many usable host IP addresses are available in this subnet, and what is the subnet mask?',
    options: [
      {
        id: 'opt-a',
        text: '62 usable host addresses; Subnet mask: 255.255.255.192',
        explanation: 'Correct! A /26 prefix leaves 32 - 26 = 6 host bits. 2^6 = 64 total addresses minus 2 (network address and broadcast address) = 62 usable hosts. Mask: 11111111.11111111.11111111.11000000 = 255.255.255.192.'
      },
      {
        id: 'opt-b',
        text: '126 usable host addresses; Subnet mask: 255.255.255.128',
        explanation: 'Incorrect: /25 gives 126 usable hosts, not /26.'
      },
      {
        id: 'opt-c',
        text: '254 usable host addresses; Subnet mask: 255.255.255.0',
        explanation: 'Incorrect: /24 gives 254 usable hosts.'
      },
      {
        id: 'opt-d',
        text: '30 usable host addresses; Subnet mask: 255.255.255.224',
        explanation: 'Incorrect: /27 gives 30 usable hosts.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'IPv4 CIDR Subnetting & Host Calculation'
  },

  // ================= CLOUD COMPUTING =================
  {
    id: 'it-cloud-1',
    category: 'cloud_computing',
    categoryLabel: 'Cloud Infrastructure & Virtualization',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Cloud Service Models: IaaS vs PaaS vs SaaS',
    question: 'Under the Cloud Shared Responsibility Model for Platform-as-a-Service (PaaS, e.g. AWS Elastic Beanstalk, Google App Engine, Azure App Services), which layer is the customer directly responsible for securing and managing?',
    options: [
      {
        id: 'opt-a',
        text: 'Physical data center cooling and biometric entry controls.',
        explanation: 'Incorrect: Physical infrastructure is strictly the cloud provider\'s responsibility.'
      },
      {
        id: 'opt-b',
        text: 'Application source code, customer configurations, and database access credentials.',
        explanation: 'Correct! In PaaS, the cloud provider manages physical hardware, virtualization, and OS patching; the customer manages application code and data access controls.'
      },
      {
        id: 'opt-c',
        text: 'Hypervisor kernel patching and server motherboard BIOS upgrades.',
        explanation: 'Incorrect: Hypervisor and server firmware are maintained by cloud vendors.'
      },
      {
        id: 'opt-d',
        text: 'Undersea optical fiber networking lines.',
        explanation: 'Incorrect: Global transit network backbone is operated by the cloud vendor.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Cloud Shared Responsibility Model (PaaS)'
  },
  {
    id: 'it-cloud-2',
    category: 'cloud_computing',
    categoryLabel: 'Cloud Infrastructure & Virtualization',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Containerization: Docker vs Virtual Machines',
    question: 'Why do Docker containers provide significantly faster startup times (milliseconds) and higher deployment density compared to traditional Type-2 Hypervisor Virtual Machines (VMs)?',
    options: [
      {
        id: 'opt-a',
        text: 'Containers share the host operating system kernel and isolate user spaces via Linux namespaces and cgroups, avoiding the overhead of booting a full guest OS per instance.',
        explanation: 'Correct! VMs emulate virtual hardware and boot an entire guest OS kernel. Containers share the host kernel while isolating processes through cgroups and namespaces.'
      },
      {
        id: 'opt-b',
        text: 'Containers do not use memory or CPU cycles.',
        explanation: 'Incorrect: Containers consume real host resources.'
      },
      {
        id: 'opt-c',
        text: 'Virtual machines cannot run Linux.',
        explanation: 'Incorrect: VMs routinely run Linux and Windows.'
      },
      {
        id: 'opt-d',
        text: 'Containers bypass networking security entirely.',
        explanation: 'Incorrect: Containers use virtual network bridges (veth).'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Containerization Architecture vs Hypervisor VMs'
  },

  // ================= CYBERSECURITY =================
  {
    id: 'it-sec-1',
    category: 'cybersecurity',
    categoryLabel: 'Cybersecurity & Information Defense',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Public Key Cryptography & Digital Signatures',
    question: 'When Bob wants to send Alice a confidential message that can ONLY be read by Alice, and Alice wants mathematical certainty that the message was authored by Bob and not tampered with, how are the cryptographic keys used?',
    options: [
      {
        id: 'opt-a',
        text: 'Bob signs with his Private Key (ensuring non-repudiation) and encrypts with Alice\'s Public Key (ensuring confidentiality that only Alice\'s Private Key can decrypt).',
        explanation: 'Correct! Encrypting with recipient\'s Public Key guarantees only recipient can decrypt. Signing with sender\'s Private Key proves authorship and integrity.'
      },
      {
        id: 'opt-b',
        text: 'Bob encrypts with his own Public Key and gives Alice his Private Key.',
        explanation: 'Incorrect: Sharing private keys completely compromises security.'
      },
      {
        id: 'opt-c',
        text: 'Bob uses MD5 hash without any encryption.',
        explanation: 'Incorrect: MD5 is broken, unencrypted, and provides zero confidentiality.'
      },
      {
        id: 'opt-d',
        text: 'Both parties use a hardcoded plaintext password sent in HTTP headers.',
        explanation: 'Incorrect: Exposes credentials over the network in cleartext.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Asymmetric Cryptography: Encryption vs Digital Signature'
  },
  {
    id: 'it-sec-2',
    category: 'cybersecurity',
    categoryLabel: 'Cybersecurity & Information Defense',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Mitigating SQL Injection & XSS',
    question: 'An enterprise web portal allows search queries. A security audit discovers that typing `admin\' OR 1=1 --` bypasses authentication. What is the fundamental root cause and the required industry-standard remediation?',
    options: [
      {
        id: 'opt-a',
        text: 'Root cause: Plaintext dynamic SQL string concatenation. Remediation: Parameterized queries (Prepared Statements), which treat user input strictly as data literals rather than executable SQL syntax.',
        explanation: 'Correct! Prepared statements compile the query structure first, completely neutralizing SQL injection regardless of special characters in user input.'
      },
      {
        id: 'opt-b',
        text: 'Root cause: Using HTTPS instead of HTTP. Remediation: Disable TLS certificates.',
        explanation: 'Incorrect: TLS secures transit, not backend SQL interpretation.'
      },
      {
        id: 'opt-c',
        text: 'Root cause: Database port 3306 is open. Remediation: Delete the SQL database.',
        explanation: 'Incorrect: Parameterized queries resolve the vulnerability.'
      },
      {
        id: 'opt-d',
        text: 'Root cause: Client browser JavaScript is enabled.',
        explanation: 'Incorrect: SQL injection is a server-side vulnerability.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'SQL Injection Mitigation & Parameterized Queries'
  }
];
