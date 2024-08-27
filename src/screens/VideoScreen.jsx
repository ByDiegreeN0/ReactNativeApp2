import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { Video, ResizeMode } from "expo-av";

export default function App() {
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [currentImage, setCurrentImage] = useState("");
    const [mediaType, setMediaType] = useState("video");

    useEffect(() => {
        fetchMedia(0, mediaType);
    }, [mediaType]);

    const fetchMedia = async (first, mediaType) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const media = await MediaLibrary.getAssetsAsync({
                first: first + 30,
                sortBy: MediaLibrary.SortBy.creationTime,
                mediaType:
                    mediaType === "video"
                        ? MediaLibrary.MediaType.video
                        : MediaLibrary.MediaType.image,
            });
            setGalleryFiles(media.assets);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Pressable
                onPress={() => {
                    setCurrentImage(item.uri);
                    setMediaType(item.mediaType);
                }}
            >
                {item.mediaType === "video" ? (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                ) : (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.heading}>Galería de Videos</Text>

            <View style={styles.buttonContainer} />

            <Modal visible={currentImage !== ""} transparent={false}>
                <View style={styles.modalContainer}>
                    <Pressable
                        style={styles.closeButton}
                        title="Close"
                        onPress={() => setCurrentImage("")}
                    >
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                    {mediaType === "video" ? (
                        <Video
                            style={styles.media}
                            source={{ uri: currentImage }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                        />
                    ) : (
                        <Image
                            source={{ uri: currentImage }}
                            style={styles.media}
                        />
                    )}
                </View>
            </Modal>
            <View style={styles.scrollContainer}>
                <FlatList
                    data={galleryFiles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    onEndReached={() => {
                        fetchMedia(galleryFiles.length, mediaType);
                    }}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
        backgroundColor: "#003554", 
    },
    scrollContainer: {
        flex: 1,
        marginTop: 20,
        width: "100%",
    },
    heading: {
        color: "#00a6fb", 
        marginBottom: 20,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    imageContainer: {
        flex: 1,
        margin: 3,
        aspectRatio: 1,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#006494", 
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#051923", 
    },
    closeButton: {
        position: "absolute",
        top: 40,
        zIndex: 1,
        flex: 1,
        alignSelf: "center",
    },
    closeText: {
        color: "#fff",
        fontSize: 20,
        padding: 10,
        backgroundColor: "#003554", 
    },
    media: {
        width: "100%",
        height: "100%",
    },
});
