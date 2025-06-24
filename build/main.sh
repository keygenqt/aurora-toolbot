#!/bin/bash

################
## Build project
################

id='com.keygenqt.aurora-toolbot'
flatpak_manifest='build/com.keygenqt.aurora-toolbot.yml'

# Set root dir
cd "$(dirname "$(realpath "$0")")"/../ || exit

# Build deb/appimage
# npm run tauri build

# Update manifest
deb_path=$(find $PWD/src-tauri/target/release/bundle -name *.deb | head -n 1)
file_name=$(basename -- "$deb_path" | sed s/deb/flatpak/g)

line=$(awk "/path:/{ print NR; exit }" $flatpak_manifest)
sed -i "${line}s|.*|        path: $deb_path|g" $flatpak_manifest

# Dependency
# flatpak install flathub org.gnome.Platform//48 org.gnome.Sdk//48

# Clear
rm -rf repo
rm -rf build-dir

# Build
flatpak-builder build-dir $flatpak_manifest
flatpak build-export repo build-dir
flatpak build-bundle repo $file_name $id --runtime-repo=https://flathub.org/repo/flathub.flatpakrepo

# Install
flatpak install --user $file_name --assumeyes
flatpak run $id
flatpak -y remove $id

# Clear
rm -rf repo
rm -rf build-dir
