# terminal
alias zshconfig="code ~/.zshrc"
alias create="code  ~/.oh-my-zsh/custom/aliases.zsh"
alias refresh="source  ~/.oh-my-zsh/custom/aliases.zsh"
alias c="clear"
# alias ll="ls -la"
alias cat="bat"
alias la="ls -A"
alias ls="eza --group-directories-first --icons"
alias ll="eza -l --group-directories-first --icons --git"
alias lt="eza --tree --level=2 --icons"

# mac
alias jpgscreenshot="defaults write com-apple screencapture type jpg"
alias pngscreenshot="defaults write com.apple. screencapture type png"
alias showhidden="defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder" # show hidden file
alias hidehidden="defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder" # hide hidden file

# network
alias myip="curl ifconfig.me" # Get external IP
alias ports="lsof -i -P | grep LISTEN" # Show open ports
alias pingg="ping google.com" # Ping Google
alias flushdns="sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder"

# navigation
alias home="~"
alias desk="~/Desktop"
alias dev="~/Developer"
alias docs="~/Documents"
alias downloads="~/Downloads"
alias movies="~/Movies"
alias music="~/Music"
alias pics="~/Pictures"

# youtube-dl
alias ytnpl="youtube-dl --no-playlist --restrict-filenames"
alias ytm="ytnpl --format bestaudio --extract-audio"

# mongo
alias mongo-start="brew services start mongodb-community"
alias mongo-stop="brew services stop mongodb-community"

# git
alias changedmost="git log --format=format: --name-only --since="1 year ago" | sort | uniq -c | sort -nr | head -20"

# Make directory and immediately cd into it
function mkcd() {
  mkdir -p "$1"
  cd "$1"
}