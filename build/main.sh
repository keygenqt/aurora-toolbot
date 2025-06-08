#!/bin/bash

################
## Build project
################

id='com.keygenqt.aurora-toolbot'
flatpak_manifest='build/com.keygenqt.aurora-toolbot.yml'

# Set root dir
cd "$(dirname "$(realpath "$0")")"/../ || exit

# Build deb
npm run tauri build

# Update manifest
deb_path=$(find $PWD/src-tauri/target/release/bundle/deb -name *.deb | head -n 1)
line=$(awk "/path:/{ print NR; exit }" $flatpak_manifest)
sed -i "${line}s|.*|        path: $deb_path|g" $flatpak_manifest

# Build flatpak
flatpak install flathub org.gnome.Platform//47 org.gnome.Sdk//47
flatpak build-bundle repo aurora-toolbot.flatpak $id --runtime-repo=https://flathub.org/repo/flathub.flatpakrepo
flatpak-builder --force-clean --user --install-deps-from=flathub --repo=repo --install flatpak-build $flatpak_manifest

# Run
flatpak run $id

# Remove
flatpak -y remove $id
