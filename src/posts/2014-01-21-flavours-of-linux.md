---

title: Flavours of Linux
---

For whatever reason, I have found myself looking after two VPS set-ups: the first running CentOS with [South West Broadband](http://swbroadband.co.uk), the second an Ubuntu droplet over at [Digital Ocean](http://digitalocean.com). Thing is, after learning the basics of server configuration, and getting comfortable with the way CentOS does things, I've only gone and confused myself by flitting between the variants. Common tasks are carried out in quite different ways.

For instance, CentOS uses `yum` as its package manager; Ubuntu has `apt-get`. When configuring Apache on CentOS, it is restarted using `/etc/init.d/httpd restart` (which I've aliased to the slightly snappier `reboot`). Back in Ubuntu-land, this operation is done with `service apache2 restart`, but don't forget to activate any new hosts with `a2ensite`.

Below is a short table describing the commands I've found useful as a website owner:

<table>
<thead>
<tr><th>Task</th><th>CentOS</th><th>Ubuntu</th></tr>
</thead>
<tbody>
<tr><td>Change password</td><td colspan="2"><code>passwd</code></td></tr>
<tr><td>Add a user</td><td colspan="2"><code>adduser USERNAME</code></td></tr>
<tr><td>Delete a user</td><td colspan="2"><code>userdel USERNAME</code></td></tr>
<tr><td>Remove user directory</td><td colspan="2"><code>rm -rf /home/USERNAME</code></td></tr>
<tr><td>Delete user and their home directory</td><td colspan="2"><code>userdel -r USERNAME</code></td></tr>
<tr><td>Webroot</td><td colspan="2"><code>/var/www</code></td></tr>
<tr><td>Edit virtual hosts</td><td><code>/etc/httpd/conf/httpd.conf</code></td><td><code>/etc/apache2/sites-available/site-name</code></td></tr>
<tr><td>Enable virtual host</td><td>N/A</td><td><code>a2ensite site-name</code></td></tr>
<tr><td>Reboot Apache</td><td><code>/etc/init.d/httpd restart</code></td><td><code>service apache2 restart</code></td></tr>
<tr><td>Install package</td><td><code>yum install package</code></td><td><code>apt-get package</code></td></tr>
<tr><td>Find IP address</td><td colspan="2"><code>ifconfig eth0</code></td></tr>
</tbody></table>

*PS - Sorry for not using your favourite distro, or for doing things in an incredibly convoluted manner. Feel free to correct me on Twitter with any tips and tricks you've picked up!*
