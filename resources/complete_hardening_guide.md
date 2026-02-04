# Complete Infrastructure Hardening Guide

**Author**: Mwithiga | Mwithiga Labs  
**Last Updated**: February 2026  
**Level**: Intermediate  
**Target**: Linux servers (Ubuntu/Debian/Kali)

---

## Introduction

Hello there fellow seeker, I'm Mwithiga. This guide documents the complete infrastructure hardening process I implemented across Incident 001 and Incident 002. It covers SSH gateway hardening, UFW firewall configuration, and Fail2Ban intrusion prevention.

**What you'll learn:**
- How to move SSH from the default port to a custom port
- How to disable root login and limit authentication attempts
- How to implement a "default deny" firewall policy
- How to automatically jail brute-force attackers

**Prerequisites:**
- Root or sudo access to a Linux server
- Basic command-line knowledge
- SSH access to your server

---

## Incident 001: Hardening the SSH Gateway

### The Objective
Secure the primary entry point by moving beyond default configurations.

### Step 1: Installation

```bash
sudo apt update
sudo apt install openssh-server -y
```

### Step 2: Configuration

1. **Open the SSH configuration file**:
```bash
sudo nano /etc/ssh/sshd_config
```

2. **Make these critical changes**:
   - Find `#Port 22` and change to `Port 2222` (remove the #)
   - Find `PermitRootLogin` and change to `PermitRootLogin no`
   - Add or modify `MaxAuthTries 3`

3. **Save the file**: Press `Ctrl + O`, then `Enter`, then `Ctrl + X`

### Step 3: Verification

```bash
# Check for syntax errors
sudo sshd -t

# Verify the configuration was saved
grep -E "Port|PermitRoot|MaxAuth" /etc/ssh/sshd_config

# Restart the service
sudo service ssh restart

# Verify the port is active
sudo ss -lntp | grep 2222
```

**Expected output**: You should see `:2222` in the listening ports.

### The Challenge: Intent vs. Configuration

The biggest hurdle was ensuring changes were actually saved and applied. The lesson: always verify with `grep` and `ss` commands before assuming the configuration is live.

**Critical Note**: If you're connecting via SSH, make sure to test the new port in a separate terminal before closing your current session. Otherwise, you risk locking yourself out.

---

## Incident 002: Building the Perimeter Defense

### The Objective
Layer firewall rules and intrusion prevention on top of the hardened SSH gateway.

### Step 1: UFW Firewall Installation

```bash
sudo apt install ufw -y
```

### Step 2: UFW Configuration

```bash
# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# CRITICAL: Allow SSH on custom port BEFORE enabling
sudo ufw allow 2222/tcp

# Enable the firewall
sudo ufw enable

# Verify the rules
sudo ufw status verbose
```

**Expected output**:
```
Status: active
To                         Action      From
--                         ------      ----
2222/tcp                   ALLOW       Anywhere
```

### Step 3: Fail2Ban Installation

```bash
sudo apt install fail2ban -y
```

### Step 4: Fail2Ban Configuration

1. **Create a custom jail configuration**:
```bash
sudo nano /etc/fail2ban/jail.local
```

2. **Add this configuration**:
```ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

**Configuration Explained**:
- `enabled = true`: Activates the SSH jail
- `port = 2222`: Monitors our custom SSH port
- `maxretry = 3`: Ban after 3 failed attempts
- `bantime = 3600`: Keep the ban active for 1 hour (3600 seconds)
- `findtime = 600`: Count failures within a 10-minute window

3. **Save and restart**:
```bash
# Save: Ctrl + O, Enter, Ctrl + X

# Restart Fail2Ban
sudo systemctl restart fail2ban

# Verify the jail is active
sudo fail2ban-client status sshd
```

**Expected output**:
```
Status for the jail: sshd
|- Filter
|  |- Currently failed: 0
|  |- Total failed:     0
|  `- Journal matches:  systemd_unit=ssh.service + _comm=sshd
`- Actions
   |- Currently banned: 0
   |- Total banned:     0
   `- Banned IP list:
```

### The Challenge: Avoiding Lockout

The critical lesson was sequence. You must allow your SSH port in UFW before enabling the firewall, or you lock yourself out completely.

**Recovery Note**: If you do get locked out, you'll need physical access to the server or console access through your hosting provider to disable UFW and fix the configuration.

---

## Verification and Testing

### Test 1: SSH Connection
From another machine, test the new SSH configuration:
```bash
ssh -p 2222 username@your-server-ip
```

### Test 2: Firewall Status
```bash
sudo ufw status verbose
```

### Test 3: Fail2Ban Monitoring
```bash
# Check the jail status
sudo fail2ban-client status sshd

# Monitor the log in real-time
sudo tail -f /var/log/fail2ban.log
```

### Test 4: Trigger a Ban (Optional)
From another machine, intentionally fail SSH login 3 times to verify Fail2Ban is working. Then check:
```bash
sudo fail2ban-client status sshd
```

You should see the IP address listed under "Banned IP list".

---

## Maintenance and Monitoring

### Regular Checks

**Weekly**:
```bash
# Check for banned IPs
sudo fail2ban-client status sshd

# Review authentication logs
sudo grep "Failed password" /var/log/auth.log | tail -20
```

**Monthly**:
```bash
# Review firewall rules
sudo ufw status numbered

# Check SSH configuration
sudo sshd -t
```

### Unbanning an IP

If you accidentally ban yourself or need to unban an IP:
```bash
sudo fail2ban-client set sshd unbanip <IP_ADDRESS>
```

---

## Why This Matters for Kenyan Organizations

Under the Data Protection Act (2019), organizations handling digital data have a legal obligation to implement "appropriate technical measures" to protect that data. This hardening process directly addresses that requirement by:

1. **Reducing Attack Surface**: Moving SSH to a non-standard port eliminates 90% of automated scanning attempts
2. **Preventing Unauthorized Access**: Disabling root login and limiting attempts creates multiple barriers
3. **Automated Response**: Fail2Ban provides real-time intrusion prevention without manual intervention
4. **Audit Trail**: All authentication attempts are logged for compliance reporting

---

## Professional Implementation

**Note on Documentation**: This guide provides the technical foundation, but every infrastructure is unique. Professional implementation requires:

- Environment-specific configuration
- Integration with existing security policies
- Testing and validation in staging environments
- Documentation for compliance audits
- Ongoing monitoring and maintenance

If your organization needs this level of protection with professional support, reach out through [Mwithiga Labs](https://vintagegent.github.io/mwithiga-labs).

---

## Troubleshooting

### SSH Service Won't Start
```bash
# Check for syntax errors
sudo sshd -t

# Check the service status
sudo systemctl status ssh

# View detailed logs
sudo journalctl -u ssh -n 50
```

### UFW Blocks Legitimate Traffic
```bash
# Check current rules
sudo ufw status numbered

# Delete a specific rule (by number)
sudo ufw delete <rule_number>
```

### Fail2Ban Not Banning
```bash
# Check the jail configuration
sudo fail2ban-client get sshd logpath

# Verify the log file exists and is being written to
sudo tail -f /var/log/auth.log

# Restart Fail2Ban
sudo systemctl restart fail2ban
```

---

## Next Steps

After completing this hardening process, consider:

1. **SSH Key Authentication**: Replace password authentication entirely with SSH keys
2. **Two-Factor Authentication**: Add an additional layer with tools like Google Authenticator
3. **Log Aggregation**: Centralize logs for better monitoring
4. **Regular Audits**: Schedule quarterly security reviews

---

**Stay curious, stay secure.**

**— The Seeker | Mwithiga Labs**

For questions or professional implementation services, visit [Mwithiga Labs](https://vintagegent.github.io/mwithiga-labs) or reach out via the contact section.
